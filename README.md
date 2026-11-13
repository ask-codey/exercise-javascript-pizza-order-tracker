# Exercise: Pizza Order Tracker

Exercise code for the lesson **Exercise: Pizza Order Tracker** in the JavaScript in Depth course on [ask-codey.com](https://www.ask-codey.com).

Pie in the Sky Pizza is busy on a Friday night, and its kitchen takes time: the dough, the toppings and the oven each take a few minutes, and sometimes the shop runs out of mushrooms. You'll finish the three functions in `tracker.js` that keep track of it all: one order from dough to oven, a whole table's orders at the same time, and the fastest free driver for the delivery. Tests check every function.

## What's here

- `tracker.js`: the three functions, each returning `''` or `[]` for now. The comment above each one says what it should return, with examples. For you to finish.
- `kitchen.js`: the kitchen. Its functions (`makeDough`, `addToppings`, `bake` and `askDriver`) each return a promise, and some of them reject. The comments say what each one gives back. Ready to use: read it, but don't change it.
- `track.js`: runs a Friday-night rush with your functions and prints what happens, so you can see them at work. Ready to use.
- `tracker.test.js`: tests that call your functions. You don't need to change this file.
- `package.json`: tells Node.js how to run this folder's code and its tests. Ready to use.

Everything runs in Node.js: there's no web page in this exercise.

## Run it

Open the folder in VS Code, then open its terminal with **Terminal > New Terminal**, and type:

```bash
node track.js
```

Until your functions are finished, it prints empty lines where the orders should be. That's expected.

## Check your work

```bash
node --test
```

At first every test fails: that is expected. Each function you finish turns its tests green. A failing test's message says what it expected, for example *Return `'Order <id>: sorry, '` followed by the error's message.*

The kitchen's clock is sped up (10 milliseconds stand for one minute), so the whole run takes about a second.

## The rules

- Write `trackOrder` as an `async` function that uses `await`, with `try` and `catch` around the kitchen's steps.
- Use `Promise.all` in `orderForTheTable` and `Promise.any` in `fastestDelivery`.
- None of your functions lets an error escape: when something goes wrong, each one returns a line that tells the customer.
- Keep the word `export` in front of each function, and don't change `kitchen.js`.

## Tips

- Read `kitchen.js` first. What does `makeDough` fulfill with, and what does `addToppings` need to be given?
- `orderForTheTable` can use the `trackOrder` you've already written, once for each order. An array's `map` makes one promise per order.
- Since `trackOrder` catches its own errors, its promise never rejects. What does that mean for `Promise.all`?
- When every promise you give `Promise.any` rejects, it rejects too, with an `AggregateError`. `try` and `catch` turn that into a friendly line.

## Hand it in

When it works, put your solution in a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. You don't need Git: create the repo on GitHub, choose **Add file**, then **Upload files**, and upload everything in this folder. The lesson page shows each step, and the lesson *Put Your Code on GitHub* walks through every screen.
