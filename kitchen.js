// The Pie in the Sky Pizza kitchen. It's ready to use: you don't need to change this file.
//
// Every job in a kitchen takes time, so every function here returns a promise. Some of them reject:
// the kitchen can run out of a topping, and a driver can be busy.
// To keep the tests fast, 10 milliseconds stand for one minute in the kitchen.

const oneMinute = 10;

// What the kitchen has run out of today.
const outOfStock = ['mushrooms'];

// The delivery drivers: how many minutes each one needs to reach a customer, and who's busy.
const drivers = {
  Sam: { minutes: 8, busy: true },
  Kai: { minutes: 9, busy: false },
  Priya: { minutes: 12, busy: false },
  Ana: { minutes: 15, busy: true },
  Leo: { minutes: 20, busy: false },
};

// makeDough(order) takes 4 minutes. It fulfills with the order as a pizza at the 'dough' stage.
// makeDough({ id: 101, pizza: 'Margherita', toppings: ['basil'] })
//   -> { id: 101, pizza: 'Margherita', toppings: ['basil'], stage: 'dough' }
export function makeDough(order) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...order, stage: 'dough' }), 4 * oneMinute);
  });
}

// addToppings(pizza) takes 3 minutes. It needs the pizza that makeDough gave back.
// It fulfills with the pizza at the 'topped' stage, or rejects with an Error such as 'out of mushrooms'.
export function addToppings(pizza) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const missing = pizza.toppings.find((topping) => outOfStock.includes(topping));
      if (pizza.stage !== 'dough') {
        reject(new Error('the dough is not ready yet'));
      } else if (missing) {
        reject(new Error(`out of ${missing}`));
      } else {
        resolve({ ...pizza, stage: 'topped' });
      }
    }, 3 * oneMinute);
  });
}

// bake(pizza) takes 6 minutes. It needs the pizza that addToppings gave back.
// It fulfills with the pizza at the 'baked' stage.
export function bake(pizza) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pizza.stage !== 'topped') {
        reject(new Error('the toppings are not on yet'));
      } else {
        resolve({ ...pizza, stage: 'baked' });
      }
    }, 6 * oneMinute);
  });
}

// askDriver(name) phones one driver. A free driver answers after as many minutes as their trip takes,
// and fulfills with { name, minutes }. A busy driver says no after 1 minute: the promise rejects with an Error.
// askDriver('Priya') -> fulfills with { name: 'Priya', minutes: 12 } after 12 minutes
// askDriver('Sam')   -> rejects with Error('Sam is busy') after 1 minute
export function askDriver(name) {
  return new Promise((resolve, reject) => {
    const driver = drivers[name];
    if (!driver) {
      setTimeout(() => reject(new Error(`there is no driver named ${name}`)), oneMinute);
    } else if (driver.busy) {
      setTimeout(() => reject(new Error(`${name} is busy`)), oneMinute);
    } else {
      setTimeout(() => resolve({ name, minutes: driver.minutes }), driver.minutes * oneMinute);
    }
  });
}
