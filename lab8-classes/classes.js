// Part 1
//// Task 1.1
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
};

//// Task 1.2
Book.prototype.getSummary = function() {
    return `The book '${this.title}' was written by ${this.author} in ${this.year}`;
};

//// Task 1.3
const book1 = new Book('Submarine wreck', 'Oleg', '2025');
console.log(book1.getSummary());
const book2 = new Book('Maksym and his safe', 'Oleg', '2025');
console.log(book2.getSummary());
console.log(book1.__proto__ === Book.prototype);

//// Task 1.4
Array.prototype.getLastElement = function () {
    return this[this.length - 1];
};

arr1 = [1, 2, 3, 4, 5];
console.log(arr1.getLastElement())

// Part 2
//// Task 2.1
class Publication {
    static type = 'General Publication';

    constructor(title, year) {
        this.title = title;
        this.year = year;
    };

    static isRecent (publicationYear) {
        if (publicationYear > 2020) {
            return true;
        } else {
            return false;
        };
    };
};

console.log(Publication.type)
console.log(Publication.isRecent(2022))

//// Task 2.2
class Magazine extends Publication {
    #isDigital = false;

    constructor(title, year, issue) {
        super(title, year);
        this.issue = issue;
    };

    //// Task 2.3
    get digitalStatus() {
        return this.#isDigital;
    };

    set digitalStatus(status) {
        this.#isDigital = status; 
    };

    //// Task 2.4
    getYearInfo() {
        return `Year: ${this.year}`;
    };
};

class Newspaper extends Magazine {
    constructor(title, year, issue) {
        super(title, year, issue);
    };

    getYearInfo() {
        return super.getYearInfo() + " (published daily).";
    };
};

const newsp1 = new Newspaper('Submarine adventures', 2025, 8);
console.log(newsp1.getYearInfo());

// Part 3
//// Task 3.1
const objA = new Publication("Captain Oleg and his three friends", 2025);
const objB = new Magazine("Friend and his captain Oleg", 2025, 2);
console.log(objA instanceof Publication);
console.log(objB instanceof Magazine);
console.log(objB instanceof Publication);
// isstanceof checks the entire prototype inheritance chain