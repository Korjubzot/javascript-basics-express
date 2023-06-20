/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
const express = require('express');

const {
  sayHello,
  uppercase,
  lowercase,
  countCharacters,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const {
  add,
  subtract,
  multiply,
  divide,
  power,
  round,
  roundUp,
  roundDown,
  absolute,
  quotient,
  remainder,
} = require('./lib/numbers');

const app = express();
app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/count/:string', (req, res) => {
  res.json({ result: countCharacters(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  const { length } = req.query;

  if (length === undefined) {
    res.json({ result: firstCharacter(string) });
  } else {
    res.json({ result: firstCharacters(string, length) });
  }
});

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: add(a, b) });
  }
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: subtract(b, a) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const { a, b } = req.body;

  if (!a || !b) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (isNaN(a) || isNaN(b)) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  const result = multiply(a, b);
  res.status(200).send({ result });
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;

  if (b === 0) {
    res.status(400).send({ error: 'Unable to divide by 0.' });
  }

  if (a === undefined || b === undefined) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  const result = divide(numA, numB);
  res.status(200).json({ result });
});

module.exports = app;
