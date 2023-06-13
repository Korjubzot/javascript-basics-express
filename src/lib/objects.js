const createPerson = (name, age) => {
  const newPerson = new Object();
  newPerson.name = name;
  newPerson.age = age;

  return newPerson;
};

const getName = object => {
  return object.name;
};

const getProperty = (property, object) => {
  return object[property];
};

const hasProperty = (property, object) => {
  if (object.hasOwnProperty(property)) {
    return true;
  }
  return false;
};

const isOver65 = person => {
  if (person.age > 65) {
    return true;
  }
  return false;
};

const getAges = people => {
  return people.map(persons => persons.age);
};

const findByName = (name, people) => {
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    if (person.name === name) {
      return person;
    }
  }
  return null;
};

const findHondas = cars => {
  const Hondas = [];

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].manufacturer === 'Honda') {
      Hondas.push(cars[i]);
    }
  }

  return Hondas;
};

const averageAge = people => {
  const average =
    people.reduce((total, next) => total + next.age, 0) / people.length;
  return average;
};

const createTalkingPerson = (name, age) => {
  function introduce(otherPersonName) {
    return `Hi ${otherPersonName}, my name is ${name} and I am ${age}!`;
  }

  return {
    name,
    age,
    introduce
  };

  // okay, so I need to set it so that the name and the age in the text are filled dynamically?
  // and also the name and age of the people, too?
};

module.exports = {
  createPerson,
  getName,
  getProperty,
  hasProperty,
  isOver65,
  getAges,
  findByName,
  findHondas,
  averageAge,
  createTalkingPerson
};
