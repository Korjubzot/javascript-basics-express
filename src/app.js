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

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');
const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('./lib/arrays');

const app = express();
app.use(express.json());

// Strings

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

// Addition

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: add(a, b) });
  }
});

// Subtraction

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: subtract(b, a) });
  }
});

// Multiply

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

// Division

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

// Remainder

app.post('/numbers/remainder', (req, res) => {
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
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  }

  const result = remainder(numA, numB);
  res.status(200).json({ result });
});

// Booleans

app.post('/booleans/negate', (req, res) => {
  const { value } = req.body;
  res.json({ result: negate(value) });
});
module.exports = app;

app.post('/booleans/truthiness', (req, res) => {
  const { value } = req.body;
  res.json({ result: truthiness(value) });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  if (isNaN(req.params.number)) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  }

  res.json({ result: isOdd(req.params.number) });
});

app.get('/booleans/:string/starts-with/:char', (req, res) => {
  const { string, char } = req.params;
  if (char.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }
  res.json({ result: startsWith(char, string) });
});

app.post('/arrays/element-at-index/:index', (req, res) => {
  const { index } = req.params;
  const { array } = req.body;
  res.json({ result: getNthElement(index, array) });
});

app.post('/arrays/to-string', (req, res) => {
  const { array } = req.body;
  res.json({ result: arrayToCSVString(array) });
});

app.post('/arrays/append', (req, res) => {
  const { array, value } = req.body;
  res.json({ result: addToArray2(value, array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  const { array } = req.body;
  res.json({ result: elementsStartingWithAVowel(array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const { array } = req.body;
  let index = 0;

  if (req.query.index) {
    index = parseInt(req.query.index);
  }
  const result = removeNthElement2(index, array);
  res.json({ result });
});
