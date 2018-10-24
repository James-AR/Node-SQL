const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express()

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Homepage')
})

server.get('/api/zoos', (req, res) => {
    db('zoos')
    .then(zoos => {
        res.status(200).json(zoos)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.post('/api/zoos', (req, res) => {
    const zoo = req.body;

    db.insert(zoo)
    .into('zoos')
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.listen(9000, () => console.log('\nAPI is running on 9000\n'))