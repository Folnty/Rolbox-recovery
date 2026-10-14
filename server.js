const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/envoyer', (req, res) => {
    const pseudo = req.body.pseudo;
    const message = req.body.message;

    console.log(`[Message Reçu] ${pseudo} a écrit : ${message}`);
    res.send("Message bien reçu par le serveur !");
});
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});


