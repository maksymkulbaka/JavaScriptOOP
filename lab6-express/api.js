const users = [
  {firstname: "Oleg", lastname: "Cherniga", score: 87},
  {firstname: "Vlad", lastname: "Rivniy", score: 92},
  {firstname: "Maksym", lastname: "Nikoplast", score: 76},
  {firstname: "Mykola", lastname: "Bondar", score: 88},
  {firstname: "Ivan", lastname: "Tkachenko", score: 69},
  {firstname: "Natalia", lastname: "Melnyk", score: 95},
  {firstname: "Serhii", lastname: "Savchenko", score: 81},
  {firstname: "Iryna", lastname: "Polishchuk", score: 73},
  {firstname: "Yurii", lastname: "Kravchenko", score: 84},
  {firstname: "Tetiana", lastname: "Mazur", score: 90},
  {firstname: "Viktor", lastname: "Lysenko", score: 67},
  {firstname: "Maria", lastname: "Rudenko", score: 78},
  {firstname: "Roman", lastname: "Horobets", score: 85},
  {firstname: "Oksana", lastname: "Didenko", score: 91},
  {firstname: "Bohdan", lastname: "Pavlenko", score: 80},
  {firstname: "Anastasiia", lastname: "Kushnir", score: 88},
  {firstname: "Denys", lastname: "Marchenko", score: 82},
  {firstname: "Yuliia", lastname: "Voitenko", score: 77},
  {firstname: "Maksym", lastname: "Zakharchenko", score: 93},
  {firstname: "Alina", lastname: "Tymoshenko", score: 89},
];

function fetchUsers(amount = 10) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const array = [...users];
            const result = [];
            for (let i = 0; i < amount; i++) {
                let index = Math.floor(Math.random() * ((array.length) - i));
                result.push(array[index]);
                array.splice(index, 1);            
            };
            resolve(result);
        }, 1000);
    });
};

function getNewUsers(amount = 5) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(users.slice(-amount));
        }, 1000);
    });
};

// Task 2.b
module.exports = { fetchUsers, getNewUsers };
