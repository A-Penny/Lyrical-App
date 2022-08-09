const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./routes/lyrics')
const PORT = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})
);

app.get('/api/lyrics', db.getLyrics);
app.get('/api/lyrics/:id', db.getLyricById);
app.post('/api/create-lyric', db.createLyric);
app.put('/api/update-lyric/:id', db.updateLyric);
app.delete('/api/delete-lyric/:id', db.deleteLyric);

app.listen(PORT, console.log(`listening on port: ${PORT}`));
