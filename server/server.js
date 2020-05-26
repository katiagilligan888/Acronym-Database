const express = require('express');
const PORT = process.env.PORT || 3000;
const knex = require('knex');
const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);
const server = express();
server.use(express.json());

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// =======================CRUD OPERATIONS==========================================

server.get('/api/acronymNames', (req, res) => {
    db('acronyms').then(acronyms => {
        res.status(200).json(acronyms)
    }).catch(err => {
        res.status(500).json({ err: "Error accessing data from the database" })
    })
})

server.get('/api/acronymNames/:id', (req, res) => {
    const { id } = req.params;
    db('acronyms')
        .where('acronym.id', id)
        .join('actions', 'acronym.id', 'action.acronym_id')
        .then(acronym => {
            res.status(200).json(acronym);
        }).catch(err => {
            res.status(500).json({ message: "Error retrieving project from database" })
        })
})

server.post('/api/acronymNames', (req, res) => {
    const data = req.body;
    console.log(data)
    db.insert(data).into('acronyms').then(id => {
        res.status(201).json(id)
    }).catch(err => {
        res.status(500).json({ err: "Error posting data to the database" })
    })
})

server.delete("/api/acronymNames/:id", (req, res) => {
    const { id } = req.params;
    db('acronyms')
        .where({ id })
        .del()
        .then(count => {
            if (count < 1) {
                res.status(400).json({ message: "The ID specified is not valid" })
            }
            res.status(200).json({ message: "Deleted project successfully" })
        }).catch(err => {
            res.status(500).json(err)
        })
});

server.put("/api/acronymNames/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;
    db('acronyms')
        .where({ id })
        .update(data)
        .then(count => {
            if (count < 1) {
                res.status(400).json({ message: "The ID specified is not valid" })
            }
            res.status(200).json({ message: "Updated project successfully" })
        }).catch(err => {
            res.status(500).json(err);
        })
});

server.listen(PORT, () => { console.log(`Starting port at PORT ${PORT}`) }); 