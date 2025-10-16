// Task 1
function invokeAfterDelay(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
                resolve(Math.floor(Math.random() * 11));
        }, time);
    });
};

invokeAfterDelay(2000).then((result) => {console.log(result)});

// Task 2
function produceRandomAfterDelay(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
                resolve(Math.floor(Math.random() * 11));
        }, time);
    });
};

Promise.all([
    produceRandomAfterDelay(2000), 
    produceRandomAfterDelay(3000)
]).then(([num1, num2]) => {
    console.log(num1 + num2);
});

// Task 3
function sleep(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {resolve()}, time);
    });
};

async function sleepTest() {
    console.log("Starting sleep");
    await sleep(1000);
    console.log("Finished sleep");
};

sleepTest();

// Task 4
const users = [
    {id: 0, name: 'Oleg', age: 20, city: 'Kyiv'},
    {id: 1, name: 'Vlad', age: 20, city: 'Rivne'},
    {id: 2, name: 'Maksym', age: 18, city: 'Kyiv'},
    {id: 3, name: 'Dmitro', age: 18, city: 'Dnipro'}
];

function getUser(id) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            const user = users.find((element) => {
                if (element.id === id) {
                    return element;
                };
            });
            if (user) {
                resolve(user);
            } else {
                reject("User not found");
            };
        }, 1000);
    });
};

getUser(1).then((result) => {console.log(result)})
getUser(4).catch((result) => {console.log(result)})

// Task 5
async function loadUsers(ids) {
    const promises = ids.map((id) => {return getUser(id)});
    const results = await Promise.allSettled(promises);
    const users = results.map((result) => {
        if (result.status === 'fulfilled') {
            return result.value;
        } else {
            return undefined;
        };
    });
    return users;
};

loadUsers([1, 0, 3, 4]).then((results) => {console.log(results)});

// Task 6
function logCall(callback) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            callback();
            console.log(new Date().toLocaleTimeString());
            resolve();
        }, 1000);
    });
};

function testCall() {
    console.log("Called callback");
};

logCall(testCall)
    .then(() => logCall(testCall))
    .then(() => logCall(testCall))
    .then(() => logCall(testCall))
    .then(() => {})

// Task 7
async function showUsers(ids) {
    console.log("loading");
    const result = await loadUsers(ids);
    console.log("loading finished")
    return result;
};

showUsers([0, 1, 2]).then((result) => {console.log(result)})
console.log(await showUsers([1, 2, 3]))