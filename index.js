// implement your API here

const express = require('express'); //import express
const db = require('./data/db'); //import database file
const server = express(); // create our server

const port = 4000; // create our port
server.listen(port, () =>
console.log(`\n API running on port ${port} \n`))

server.use(express.json()); // needed to parse JSON from the body


// GET REQUESTS BELOW
server.get('/', (req, res) => {
    res.send({ message: 'API is up and running...' });
});

server.get('/users', (req, res) => {
    //get the list of hubs (users?) from the db
    //find(), calling this returns a promise that resolves to an array of all the users contained in the database
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.log('error on GET /users', error);
            res.status(500).json({ errorMessage: 'error getting users information from database' })
        });
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    //use the findByID() method, this method expects an id as it's only parameter and returns the user corresponding to the id provided or an empty array if no user with that id is found.

    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        })
        .catch(error => {
            console.log(`error on GET /users/${id}`);
            res.status(404).json({ errorMessage: 'error getting user info'})
        });
});