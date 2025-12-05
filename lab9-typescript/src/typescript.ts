// Part 1
//// Task 1.1
type User = {
    id: number;
    name: string;
    age: number;
};

//// Task 1.2
type Admin = User & {
    role: 'admin';
};

//// Task 1.3
type Status = 'loading' | 'success' | 'error';

//// Task 1.4
function updateStatus(status: Status): void {
    console.log(`Status: ${status}`)
};

console.log(updateStatus('loading'))

//// Task 1.5
type Contact = {
    email: string;
};

type Profile = {
    username: string;
};

type FullProfile = Contact & Profile;

//// Task 1.6
const fullProfile: FullProfile = {
    email: 'user@example.com',
    username: 'exampleUser'
};

console.log(fullProfile.email);
console.log(fullProfile.username);

// Part 2
//// Task 2.1
type Point = {
    readonly x: number;
    readonly y: number;
};

//// Task 2.2
const p: Point = { x: 10, y: 20 };
// p.x = 5; 
/*
    TSError: ⨯ Unable to compile TypeScript:
    src/typescript.ts:53:3 - error TS2540: Cannot assign to 'x' because it is a read-only property.
*/

//// Task 2.3
let value: unknown = "text";
let strValue: string = value as string;

//// Task 2.4
function sum(a: number, b: number): number {
    return a + b;
}

// Part 3
//// Task 3.1
function showValue(value: string | number | boolean): void {
    if (typeof value === "string") {
        console.log("Got string:", value);
    } else if (typeof value === "number") {
        console.log("Got number:", value);
    } else {
        console.log("Got boolean:", value);
    }
}

//// Task 3.2
type Fish = {
    swim: () => void;
};

type Bird = {
    fly: () => void;
};

//// Task 3.3
function move(animal: Fish | Bird | null | undefined): void {
    //// Task 3.4
    if (animal === null || animal === undefined) {
        console.log("Object not provided");
        return;
    }
    if ("swim" in animal) {
        animal.swim();
    } else {
        animal.fly();
    }
}

const fish: Fish = {
    swim() {
        console.log("Fish swims");
    }
};

const bird: Bird = {
    fly() {
        console.log("Bird flies");
    }
};

move(fish);
move(bird);
move(null);

// Part 4
//// Task 4.1
interface Animal {
    speak(): void;
}

//// Task 4.2
class Dog implements Animal {
    speak(): void {
        console.log("Dog barks");
    }
}

//// Task 4.3
type HasName = { name: string };
type HasAge = { age: number };

type Pet = HasName & HasAge;

//// Task 4.4
const pet: Pet = {
    name: "Oleg",
    age: 4
};

console.log(pet.name);
console.log(pet.age);

//// Task 4.5
/* 
    Difference between interface and type alias:
    - interface is used to describe the structure of objects and can extend other interfaces.
    - type alias can create not only object types, but also unions, intersections, etc.
    - interface can be redeclared and they will be merged.
    - type alias does not support redeclaration.
*/

// Part 5
//// Task 5.1
type UserPreview = Omit<User, "age"> & {
    displayName: string;
};

//// Task 5.2
const preview: UserPreview = {
    id: 1,
    name: "Oleg",
    displayName: "Olejik"
};

console.log(preview.id);
console.log(preview.name);
console.log(preview.displayName);

//// Task 5.3
const users: ReadonlyArray<User> = [
    { id: 1, name: "Oleh", age: 22 },
    { id: 2, name: "Maria", age: 30 }
];

//users[0] = { id: 3, name: "Test", age: 40 };
/*
    TSError: ⨯ Unable to compile TypeScript:
    src/typescript.ts:179:1 - error TS2542: Index signature in type 'readonly User[]' only permits reading.
*/

// Part 6
//// Task 6.1
let data: unknown = "text";

if (typeof data === "string") {
    console.log("Got string");
} else if (typeof data === "number") {
    console.log("Got number");
} else if (data instanceof Date) {
    console.log("Got Date");
} else {
    console.log("Got unknown");
}

//// Task 6.2
const obj = {
    title: "Document",
    size: 120
};

if ("title" in obj) {
    console.log("Property 'title' exist:", obj.title);
} else {
    console.log("Property 'title' doesn't exist");
}

//// Task 6.3
type TypeA = {
    kind: "A";
    value: number;
};

type TypeB = {
    kind: "B";
    text: string;
};

function process(item: TypeA | TypeB): void {
    if (item.kind === "A") {
        console.log("TypeA value:", item.value);
    } else {
        console.log("TypeB text:", item.text);
    }
}

process({ kind: "A", value: 10 });
process({ kind: "B", text: "text" });
