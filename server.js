import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// Autorise Express à lire les données provenant d'un formulaire HTML
app.use(express.urlencoded({ extended: true }));

// Variable temporaire pour stocker les avis reçus
let listeAvis = [];

// Page d'accueil : Affiche le formulaire HTML
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
                <form action="/envoyer-avis" method="POST">
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur (Username) :</label>
                        <input type="text" id="username" name="username" required placeholder="Ex: JeanDupont">
                    </div>
                    <div class="form-group">
                        <label for="avis">Votre avis :</label>
                        <textarea id="avis" name="avis" rows="4" required placeholder="Écrivez votre message ici..."></textarea>
                    </div>
                    <button type="submit">Envoyer l'avis</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Route POST : Reçoit l'avis et l'enregistre
app.post('/envoyer-avis', (req, res) => {
    const { username, avis } = req.body;
    
    // Sauvegarde l'avis dans la liste
    listeAvis.push({ username, avis, date: new Date().toLocaleString() });
    
    // Message de confirmation à l'utilisateur
    res.send('<h1>Merci ! Votre avis a bien été transmis.</h1><a href="/voir-avis">Voir les avis reçus</a>');
});

// Route pour vous permettre de consulter les avis reçus
app.get('/voir-avis', (req, res) => {
    let html = '<h1>Liste des avis reçus :</h1><ul>';
    listeAvis.forEach(item => {
        html += `<li><strong>${item.username}</strong> (${item.date}) : ${item.avis}</li>`;
    });
    html += '</ul><br><a href="/">Retour au formulaire</a>';
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
