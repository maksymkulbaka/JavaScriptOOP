// Task 1
function average(...values) {
    if (values.length === 0) {
        throw new Error("no values provided");
    };
    return values.reduce((sum, e) => sum += e) / values.length;
};

console.log(average(2, 3, 4, 5));

// Task 2
function values(f, low, high) {
    result = [];
    for (let i = low; i <= high; i++) {
        result.push(f(i));
    };
    return result;
};

console.log(values((num) => {return num / 2}, 1, 5));

// Task 3
function callWithContext(object, callback) {
    callback.call(object);
};

const person = {name: 'Oleg', age: 20};

function showBirthday() {
    console.log(`Today is ${new Date().toLocaleDateString()}! Happy birthday ${this.name}!`);
};

callWithContext(person, showBirthday);

// Task 4
function createCounter() {
    let value = 0;
    return {
        increment() {
            value += 1;
        },
        getValue() {
            return value;
        }
    };
};

const counter = createCounter()
counter.increment();
console.log(counter.getValue());

// Task 5
function createGreting() {
    let lastName = null;
    let lastGreeting = null;
    return function getGreeting(name) {
        if (lastName === name) {
            console.log("Returning cached greeting")
            return lastGreeting;
        };
        lastName = name;
        lastGreeting = `Hello ${name}`;
        console.log("Returning new greeting")
        return lastGreeting;
    }
};

const getGreeting = createGreting()
console.log(getGreeting('Oleg'))
console.log(getGreeting('Oleg'))
console.log(getGreeting('Vlad'))

// Task 6
function summarize(value1) {
    return function(value2) {
        return value1 + value2;
    };
};

console.log(summarize(2)(3))

// Task 7
function findString(stringsArray) {
    return function(string) {
        if (stringsArray.includes(string)) {
            return true;
        };
        return false;
    };
};

console.log(findString(['JavaScript', 'Node.js'])('JavaScript'))

// Task 8
const capitalizeProperty = (objectsArray, propName) => {
  return objectsArray.map(object => {
    const newObject = { ...object };
    if (newObject[propName] && typeof newObject[propName] === 'string') {
        newObject[propName] = newObject[propName].charAt(0).toUpperCase() + newObject[propName].slice(1);
    };
    return newObject;
  });
};

console.log(capitalizeProperty([{name: 'oleg', age: 20}, {name: 'maksym', age: 18}, {name: 'vlad', age: 20}], 'name'))

// Task 9
function greet(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person1 = {name: 'Oleg'};
const person2 = {name: 'Maksym'};

greet.call(person1, 'Hi', '!');
greet.call(person2, 'Hello', '.');

greet.apply(person1, ['Good afternoon', '!!']);
greet.apply(person2, ['Good evening', '...']);

const greetOleg = greet.bind(person1, 'How are you doing');
greetOleg('?');

// Task 10
function executeWithLogging(callback, ...args) {
    const timeCalled = new Date().toLocaleString();
    console.log('Function name:', callback.name);
    console.log('Arguments:', args);
    console.log('Call time:', timeCalled);
    return callback(...args);
};

function add(a, b) {
    return a + b;
};

const sum = executeWithLogging(add, 4, 3);
console.log(sum);

// Task 11
function createTempGreeting() {
    let lastName = null;
    let lastGreeting = null;
    let lastTime = 0;
    return function getGreeting(name) {
        const currentTime = Date.now();
        if ((currentTime - lastTime) < 10000 && lastName === name) {
            console.log("Returning cached greeting");
            return lastGreeting;
        };
        lastName = name;
        lastGreeting = `Hello ${name}`;
        lastTime = currentTime;
        console.log("Returning new greeting");
        return lastGreeting;
    };
};

const getTempGreeting = createTempGreeting();
console.log(getTempGreeting('Oleg'));
console.log(getTempGreeting('Oleg'));
setTimeout(() => {
    console.log(getTempGreeting('Vlad'));
}, 10500);