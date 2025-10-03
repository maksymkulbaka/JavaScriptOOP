const args = process.argv.slice(2);
let sum = 0;
for (element of args) {
    sum += Number(element);
};
console.log(`Sum = ${sum}`);
