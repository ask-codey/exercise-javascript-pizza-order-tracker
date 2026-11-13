// Tests for tracker.js. Run them with: node --test
// They send orders through the kitchen in kitchen.js and check what your functions give back.
// You don't need to change this file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { trackOrder, orderForTheTable, fastestDelivery } from './tracker.js';

const margherita = { id: 101, pizza: 'Margherita', toppings: ['basil'] };
const forestMushroom = { id: 102, pizza: 'Forest Mushroom', toppings: ['mushrooms', 'thyme'] };
const pepperoni = { id: 103, pizza: 'Pepperoni', toppings: ['pepperoni'] };
const gardenVeggie = { id: 104, pizza: 'Garden Veggie', toppings: ['peppers', 'olives', 'onions'] };

// Waits for a call, and fails the test with a helpful message if its promise rejects,
// or if it's still waiting after 2 seconds (a promise that never settles would wait forever).
async function noError(call, advice) {
  let timer;
  const tooLong = new Promise((resolve) => {
    timer = setTimeout(() => resolve('too long'), 2000);
  });
  try {
    const result = await Promise.race([call(), tooLong]);
    if (result === 'too long') {
      assert.fail(`Your function never finished: after 2 seconds it was still waiting. ${advice}`);
    }
    return result;
  } catch (error) {
    if (error instanceof assert.AssertionError) {
      throw error;
    }
    assert.fail(`An error escaped: "${error.message}". ${advice}`);
  } finally {
    clearTimeout(timer);
  }
}

test('trackOrder is an async function', () => {
  assert.equal(trackOrder.constructor.name, 'AsyncFunction',
    'Put the word async in front of function trackOrder, so it can use await.');
});

test('trackOrder: a pizza the kitchen can make comes out ready', async () => {
  const advice = 'Wrap the steps in try and catch.';
  assert.equal(await noError(() => trackOrder(margherita), advice), 'Order 101: Margherita is ready',
    'A Margherita has no mushrooms, so it comes out ready. If yours says "the dough is not ready yet", ' +
    'await each step before you start the next, and hand each step the pizza the step before it gave back.');
  assert.equal(await noError(() => trackOrder(pepperoni), advice), 'Order 103: Pepperoni is ready');
});

test('trackOrder: running out of mushrooms is caught, and the customer is told', async () => {
  const line = await noError(() => trackOrder(forestMushroom),
    'addToppings rejects when the kitchen is out of a topping. Catch it with try and catch, and return the sorry line.');
  assert.equal(line, 'Order 102: sorry, out of mushrooms',
    "Return 'Order <id>: sorry, ' followed by the error's message.");
});

test('orderForTheTable: one line per order, in the order they were placed', async () => {
  const lines = await noError(() => orderForTheTable([margherita, forestMushroom, pepperoni, gardenVeggie]),
    'trackOrder catches its own errors, so this should never reject.');
  assert.deepEqual(lines, [
    'Order 101: Margherita is ready',
    'Order 102: sorry, out of mushrooms',
    'Order 103: Pepperoni is ready',
    'Order 104: Garden Veggie is ready',
  ], 'Return an array with one trackOrder line per order, in the same order as the orders.');
});

test('orderForTheTable: every pizza cooks at the same time', async () => {
  const start = Date.now();
  const lines = await noError(() => orderForTheTable([margherita, pepperoni, gardenVeggie, forestMushroom]),
    'trackOrder catches its own errors, so this should never reject.');
  const took = Date.now() - start;
  assert.equal(lines.length, 4, 'Four orders give four lines.');
  assert.ok(took < 350,
    `Four orders took ${took} ms. One order takes about 130 ms, so four at the same time should too, while four ` +
    'one after another take about 520 ms. Start every trackOrder first, then wait for them all with Promise.all.');
});

test('fastestDelivery: the first free driver to say yes takes it', async () => {
  const advice = 'Promise.any rejects only when every driver says no. Catch that with try and catch.';
  assert.equal(await noError(() => fastestDelivery(['Sam', 'Priya', 'Leo']), advice), 'Priya will deliver in 12 minutes',
    'Sam answers first, but only to say he is busy. Promise.any waits for the first yes; Promise.race stops at his no.');
  assert.equal(await noError(() => fastestDelivery(['Leo', 'Kai', 'Priya']), advice), 'Kai will deliver in 9 minutes',
    'Kai is the quickest free driver, even though Leo is first in the list. Phone them all at once.');
});

test('fastestDelivery: when nobody is free, the customer is told', async () => {
  const advice = 'When every driver says no, Promise.any rejects. Catch it, and return the line instead.';
  assert.equal(await noError(() => fastestDelivery(['Sam', 'Ana']), advice), 'No drivers free right now',
    'Sam and Ana are both busy.');
  assert.equal(await noError(() => fastestDelivery([]),
    'With no drivers to ask, Promise.any rejects straight away, but Promise.race never settles.'),
  'No drivers free right now', 'With no drivers to ask, nobody can deliver.');
});
