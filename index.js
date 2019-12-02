// implement your API here

const express = require('express'); //import express
const db = require('./data/db'); //import database file
const server = express(); // create our server
const port = 4000; // create our port

server.use(express.json()); // needed to parse JSON from the body