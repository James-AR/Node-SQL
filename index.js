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

server.get('/api/zoos/:id', (req, res) => {
    const { id } = req.params;

    db('zoos')
    .where({ id: id })
    .first()
    
    .then(zoo => {
        res.status(200).json(zoo)
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

server.put('/api/zoos/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('zoos')
    .where({ id: id })
    .update(changes)
    .then(count => {
        if(!count || count < 1) {
            res.status(404).json({message: "No record found"})
        } else {
            res.status(200).json(count)
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.delete('/api/zoos/:id', (req, res) => {
    const { id } = req.params;

    db('zoos')
    .where({ id: id })
    .delete()
    .then(count => {
        if(!count || count < 1) {
            res.status(404).json({message: "No record to be deleted"})
        } else {
            res.status(200).json(count)
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.listen(9000, () => console.log('\nAPI is running on 9000\n'))