// implement your API here

const express = require('express'); //import express
const db = require('./data/db'); //import database file
const server = express(); // create our server

const port = 4000; // create our port
server.listen(port, () =>
console.log(`\n API running on port ${port} \n`))

server.use(express.json()); // needed to parse JSON from the body


// GET REQUESTS BELOW
//1.
server.get('/', (req, res) => {
    res.send({ message: 'API is up and running...' });
});

//2.
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

//3.
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




// POST REQUESTS BELOW
// 1.
server.post('/users', (req, res) => {
    const dbUserInfo = req.body;

    db.insert(dbUserInfo)
        .then(info => {
            res.status(201).json(info)
        })
        .catch(error => {
            console.log('error in POST to /users', error)
            if (dbUserInfo !== 'name' && 'bio'){
                res
                    .end()
                    .status(400)
                    .json({errorMessage: 'We dont have a name and bio for the user.'})
            } else {
                res
                    .end()
                    .status(500)
                    .json({ error: 'Data base error in POST to /users'})
            }
        });
})

// DELETE REQUESTS BELOW
// 1.

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'user removed successfully! yay!' })
            } else {
                res.status(404).json({ message: 'user not found. sad.' })
            }
        })
        .catch(error => {
            console.log('error on the delete /users/:id', error);
            res.status(500).json({ errorMessage: 'error removing the user' })
        })
})


// PUT REQUESTS BELOW
// 1.

// server.put('users/:id', (req, res) => {
//     const id = req.params.id;
//     const dbUserInfo = req.body;

//     if (!dbUserInfo.name || !dbUserInfo.bio) {
//         res
//             .status(400)
//             .json({ errorMessage: 'Please give us the user requested info' })
//     } else {
//         db.update(id, dbUserInfo)
//             .then(user => {
//                 if (user) {
//                     res.status(200).json({ message: `Updated with ${dbUserInfo.name} ${dbUserInfo.bio}` })
//                 } else {
//                     res.status(404).json({ message: 'User with that ID doesnt exist' })
//                 }
//             })
//             .catch(() => {
//                 res
//                     .status(500)
//                     .json({ error: 'The user information could not be modified.' })
//             })
//     }
// })

server.put('/users/:id', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.update(req.params.id, req.body)
            .then(user => {
                if (user) {
                    res.status(200).json( req.body );
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(error => {
                res
                    .status(500)
                    .json({ error: "The user information could not be modified." })
            });
    }
})