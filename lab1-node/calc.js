const numArray = process.argv.slice(3).map((e) => Number(e));
let result = 0;
switch (process.argv[2]) {
    case "add":
        result = numArray[0] + numArray[1]
        break;
    case "sub":
        result = numArray[0] - numArray[1]
        break;
    case "mul":
        result = numArray[0] * numArray[1]
        break;
    case "div":
        if (numArray[1] == 0) {
            throw new Error("cannot divide by zero");
            break;
        };
        result = numArray[0] / numArray[1]
	break;
    default:
        throw new Error("wrong operation");
};
console.log(`Result = ${result}`)