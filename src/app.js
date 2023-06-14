const express = require('express');
const {
  sayHello,
  uppercase,
  lowercase,
  countCharacters,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const app = express();

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

// app.get('/strings/first-characters/:string', (req, res) => {
//   res.json({ result: firstCharacter(req.params.string) });
// });

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  const { length } = req.query;

  if (length === undefined) {
    res.json({ result: firstCharacter(string) });
  } else {
    res.json({ result: firstCharacters(string, length) });
  }
});

module.exports = app;
