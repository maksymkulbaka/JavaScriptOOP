// Task 1
const persons = [
    {name: 'John', age: 23, city: 'Boston'},
    {name: 'Alex', age: 25, city: 'New York'},
    {name: 'Alice', age: 22, city: 'Boston'},
    {name: 'Oleg', age: 20, city: 'Kyiv'},
    {name: 'Maksym', age: 18, city: 'Kyiv'},
];

persons.groupName = 'A'
persons.teacher = 'John Doe'
persons.year = '2023'

for (element of persons) {console.log(element)};

for (element in persons) {console.log(element)};

for (let i = 0; i < persons.length; i++) {console.log(persons[i])};

// Task 2
let defaults = {mode: 'test', debugLevel: 'error', logFolder: 'root'};
let userSettings = {mode: 'production', debugLevel: 'trace'};

console.log({...defaults, ...userSettings});
console.log(Object.assign({}, defaults, userSettings));
console.log((function (def, user) {
    let result = {};
    for (let key in def) {result[key] = def[key]};
    for (let key in user) {result[key] = user[key]};
    return result;
})(defaults, userSettings));

// Task 3
persons.forEach((person) => Object.defineProperty(person, 'birthYear', {
    get: function() { 
        let currentYear = new Date().getFullYear(); 
        return currentYear - this.age}, 
    configurable: false 
}));

console.log(persons[0].birthYear);

// Task 4
let array1 = [1, 2, 3];
let array2 = [4, 5, 6];

console.log(array1.concat(array2));
console.log(...array1, ...array2);
console.log((function (arr1, arr2) {
    let result = [];
    arr1.forEach((e) => result.push(e));
    arr2.forEach((e) => result.push(e));
    return result;
})(array1, array2));

// Task 5
function turnObjectsToStrings(array) {
    result = []
    for (e of array) {
        result.push(`${e.name} from ${e.city} born in ${new Date().getFullYear() - e.age}`);
    };
    return result
};

console.log(turnObjectsToStrings(persons));

// Task 6
function ageover(array, num) {
    result = []; 
    array.forEach((e) => { 
        if (e.age > num) { 
            result.push(e); 
        }; 
    }); 
    return result 
};

// Task 7
let {name: person1Name, age: person1Age, city: person1City} = persons[0];

console.log(person1Name, person1Age, person1City);

let [person1] = persons;

console.log(person1);

// Task 8
function getUserData(array, name) {
    for (e of array) {
        if (e.name == name) {
            return e;
        };
    };
    throw new Error("Unable to find user");
};

console.log(getUserData(persons, 'Oleg'));

function showUserInfo(array, name) {
    console.log("Loading");
    try {
        console.log(getUserData(array, name));
    } catch (error) {
        console.log(error.message)
    };
    console.log("Loading finished");
};

showUserInfo(persons, 'Oleg');

// Task 9
function textToArray(text) {
    return text.split('');
};

console.log(textToArray('Hello'));

// Task 10
function reverseText(text) {
    return text.split('').reverse().join('');
};

console.log(reverseText('Hello'));

// Task 11
function checkFileExtension(name, extension) {
    if (name.split('.').pop() == extension) {
        return true
    } else {
        return false
    };
};

console.log(checkFileExtension('main.js', 'js'));
console.log(checkFileExtension('main.png', 'js'));

// Task 12
function textToWords(text) {
    return text.split(' ');
};

console.log(textToWords("Hello World"));

// Task 13
function changeTextWord(text, oldWord, newWord) {
    return text.replace(oldWord, newWord)
};

console.log(changeTextWord("Hello World", "World", "JavaScript"))