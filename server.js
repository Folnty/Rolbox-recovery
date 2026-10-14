import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let listeAvis = [];

// 1. Page d'accueil avec le formulaire HTML
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
                .form-container { background: white; padding: 30px; border-radius: 8px; max-width: 400px; margin: 0 auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                .form-group { margin-bottom: 20px; }
                label { display: block; margin-bottom: 8px; font-weight: bold; }
                input, textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
                button { background-color: #007BFF; color: white; padding: 12px 20px; border: none; border-radius: 4px; cursor: pointer; width: 100%; font-size: 16px; }
                button:hover { background-color: #0056b3; }
                .view-link { display: block; text-align: center; margin-top: 15px; color: #007BFF; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h2>Votre avis</h2>
                <form action="/envoyer-verification" method="POST">
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur :</label>
                        <input type="text" id="username" name="username" required placeholder="Votre pseudo">
                    </div>
                    <div class="form-group">
                        <label for="avis">Votre avis :</label>
                        <textarea id="avis" name="avis" rows="5" required placeholder="Écrivez votre avis ici..."></textarea>
                    </div>
                    <button type="submit">Envoyer</button>
                </form>
                <a class="view-link" href="/voir-avis">Consulter les avis reçus</a>
            </div>
        </body>
        </html>
    `);
});

// 2. Traitement de l'envoi (Route corrigée sans espace)
app.post('/envoyer-verification', (req, res) => {
    const { username, avis } = req.body;

    if (username && avis) {
        listeAvis.push({
            username: username,
            avis: avis,
            date: new Date().toLocaleString('fr-FR')
        });
    }

    res.send(`
        <div style="text-align: center; font-family: Arial, sans-serif; margin-top: 50px;">
            <h1 style="color: #28a745;">Merci ! Votre avis a bien été transmis.</h1>
            <br>
            <a href="/" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px;">Retour</a>
            <a href="/voir-avis" style="padding: 10px 20px; background-color: #6c757d; color: white; text-decoration: none; border-radius: 4px;">Voir les avis</a>
        </div>
    `);
});

// 3. Page de visualisation des avis
app.get('/voir-avis', (req, res) => {
    let html = '<h1>Liste des avis reçus :</h1><ul>';
    if (listeAvis.length === 0) {
        html += '<p>Aucun avis reçu pour le moment.</p>';
    } else {
        listeAvis.forEach(item => {
            html += `<li><strong>${item.username}</strong> (${item.date}) : ${item.avis}</li>`;
        });
    }
    html += '</ul><br><a href="/">Retour au formulaire</a>';
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Serveur actif sur le port ${PORT}`);
});
