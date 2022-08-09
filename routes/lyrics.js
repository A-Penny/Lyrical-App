const { restart } = require('nodemon');
const db = require('../db');
const pg = require('../db');


const getLyrics = (req, res) => {
    const text = 'SELECT * FROM lyrics ORDER BY id ASC';
    db.query(text, (err, results) => {
        if (err) {
            res.send(err.details)
        }
        res.status(200).json(results.rows)
    })
};

const getLyricById = (req, res) => {
    const id = parseInt(req.params.id);
    const text = 'SELECT * FROM lyrics WHERE id = $1';

    db.query(text, [id], (err, results) => {
        if (err) {
            res.send(err.details)
        }
        res.status(200).json(results.rows)
    })
};

const createLyric = (req, res) => {
    const { lyric, author_name } = req.body;
    const text = 'INSERT INTO lyrics (lyric, author_name) VALUES($1, $2) RETURNING *'

    db.query(text, [lyric, author_name], (err, results) => {
        if (err) {
            res.send (err.details)
        }
        res.status(201).send(`Lyric added with ID:${results.rows[0].id}`)
    })
};

const updateLyric = (req, res) => {
    const id = parseInt(req.params.id);
    const { lyric, author_name } = req.body;
    const text = 'UPDATE lyrics SET lyric = $1, author_name = $2 WHERE id = $3';
    
    db.query(text, [lyric, author_name, id], (err, results) => {
        if (err) {
            res.send(err.details)
        }
        res.status(200).send(`Lyric modified with ID:${id}`)
    })
};

const deleteLyric = (req, res) => {
    const id = parseInt(req.params.id);
    const text = 'DELETE FROM lyrics WHERE id = $1';

    db.query(text, [id], (err, results) => {
        if (err) {
            res.send(err.details)
        }
        res.status(200).send(`Lyric with ID:${id} has been deleted`)
    })
};

module.exports = {
    getLyrics,
    getLyricById,
    createLyric,
    updateLyric,
    deleteLyric
};