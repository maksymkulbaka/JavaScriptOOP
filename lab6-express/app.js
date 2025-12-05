// Task 1
const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const fs = require('fs');
const { fetchUsers, getNewUsers } = require('./api.js');

// Task 2.a
app.use(express.static('public'));

// Task 2.b
app.get('/users', (req, res) => {
    fetchUsers().then(value => res.json(value));
});

app.get('/users/new', (req, res) => {
    getNewUsers().then(value => res.json(value));
});

// Task 2.c
app.use(express.json());

app.post('/sort-users', (req, res) => {
    const { users } = req.body;
    const sort = req.query.sort;
    const order = req.query.order;
    let sorted = [];
    sorted = [...users].sort((a, b) => {
        if (a[sort] < b[sort]) return order === 'asc' ? -1 : 1;
        if (a[sort] > b[sort]) return order === 'asc' ? 1 : -1;
        return 0;
    });
    res.json(sorted);
});

// Task 2.d
app.use('/gallery', express.static(path.join(__dirname, 'gallery')));

app.get('/gallery/list', (req, res) => {
    const galleryPath = 'gallery'
    fs.readdir(galleryPath, (err, files) => {
        if (err) {
            return res.json([]);
        }
        const images = files.filter(f => {
            const ext = f.toLowerCase();
            return ext.endsWith('.jpg') ||
                   ext.endsWith('.jpeg') ||
                   ext.endsWith('.png') ||
                   ext.endsWith('.gif') ||
                   ext.endsWith('.webp');
        });
        res.json(images);
    });
});

// Task 3
app.get('/weather', (req, res) => {
    const temperature = Math.floor(Math.random() * 31);
    res.json({
        city: 'Kyiv',
        temperature: temperature
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});