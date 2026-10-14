import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// Votre route principale
app.get('/', (req, res) => {
    res.send('<h1>Le serveur de récupération Roblox est en ligne !</h1>');
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
