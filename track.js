// Runs Pie in the Sky's evening rush with your tracker and prints what happens.
// Run it with: node track.js
// It's ready to use: you don't need to change this file.
import { trackOrder, orderForTheTable, fastestDelivery } from './tracker.js';

const margherita = { id: 101, pizza: 'Margherita', toppings: ['basil'] };
const forestMushroom = { id: 102, pizza: 'Forest Mushroom', toppings: ['mushrooms', 'thyme'] };
const pepperoni = { id: 103, pizza: 'Pepperoni', toppings: ['pepperoni'] };
const gardenVeggie = { id: 104, pizza: 'Garden Veggie', toppings: ['peppers', 'olives', 'onions'] };

async function eveningRush() {
  console.log('One order, start to finish:');
  console.log(await trackOrder(margherita));

  console.log('');
  console.log('A table for four:');
  const lines = await orderForTheTable([margherita, forestMushroom, pepperoni, gardenVeggie]);
  for (const line of lines) {
    console.log(line);
  }

  console.log('');
  console.log('Who can take it?');
  console.log(await fastestDelivery(['Sam', 'Priya', 'Leo']));
  console.log(await fastestDelivery(['Sam', 'Ana']));
}

eveningRush();
