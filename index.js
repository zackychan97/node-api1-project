// implement your API here

const express = require('express'); //import express
const db = require('./data/db'); //import database file
const server = express(); // create our server

const port = 4000; // create our port
server.listen(port, () =>
console.log(`\n API running on port ${port} \n`))

server.use(express.json()); // needed to parse JSON from the body

server.get('/', (req, res) => {
    res.send({ message: 'API is up and running...' });
});

server.get('/users', (req, res) => {
    //get the list of hubs (users?) from the db
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.log('error on GET /users', error);
            res.status(500).json({ errorMessage: 'error getting users information from database' })
        });
});