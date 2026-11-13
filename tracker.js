// Pie in the Sky's order tracker: three functions for you to finish.
//
// The kitchen's functions come from kitchen.js. Each one returns a promise: the comments there say what each
// one fulfills with, and when it rejects. The word export lets track.js and the tests use your functions.
import { makeDough, addToppings, bake, askDriver } from './kitchen.js';

// 1. trackOrder(order)
//    Follow one order through the kitchen: makeDough, then addToppings, then bake. Each step needs the pizza
//    the step before it gave back, so wait for each one before starting the next.
//    Write it as an async function, with await, and with try and catch.
//    When the pizza is baked, return 'Order <id>: <pizza> is ready'.
//    When a step fails, return 'Order <id>: sorry, <the error's message>'. Never let the error escape.
//    await trackOrder({ id: 101, pizza: 'Margherita', toppings: ['basil'] })
//      -> 'Order 101: Margherita is ready'
//    await trackOrder({ id: 102, pizza: 'Forest Mushroom', toppings: ['mushrooms', 'thyme'] })
//      -> 'Order 102: sorry, out of mushrooms'
export function trackOrder(order) {
  return '';
}

// 2. orderForTheTable(orders)
//    A table orders several pizzas at once. Track every order at the same time with Promise.all, not one
//    after another, and return the array of trackOrder's lines, in the same order as the orders.
//    await orderForTheTable([margherita, forestMushroom])
//      -> ['Order 101: Margherita is ready', 'Order 102: sorry, out of mushrooms']
export function orderForTheTable(orders) {
  return [];
}

// 3. fastestDelivery(driverNames)
//    Phone every driver at once with askDriver, and take the first one who says yes: use Promise.any.
//    Return '<name> will deliver in <minutes> minutes'.
//    When nobody can (every driver is busy, or there are no names), return 'No drivers free right now'.
//    await fastestDelivery(['Sam', 'Priya', 'Leo']) -> 'Priya will deliver in 12 minutes'
//    await fastestDelivery(['Sam', 'Ana'])          -> 'No drivers free right now'
export function fastestDelivery(driverNames) {
  return '';
}
