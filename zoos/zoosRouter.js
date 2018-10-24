const express = require('express')
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
        res.status(200).json(zoos)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;