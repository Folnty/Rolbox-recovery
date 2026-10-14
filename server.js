import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// Permet au serveur de lire les données du formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Stockage temporaire des avis en mémoire
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
                body { font-family: Arial, sans-serif; margin: 50px; background-color: #f4f4f4; text-align: center; }
                .form-container { background: white; padding: 30px; border-radius: 8px; max-width: 400px; margin: 0 auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: left; }
                .form-group { margin-bottom: 20px; }
                label { display: block; margin-bottom: 8px; font-weight: bold; color: #333; }
                input, textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-size: 14px; }
                button { background-color: #007BFF; color: white; padding: 12px 20px; border: none; border-radius: 4px; cursor: pointer; width: 100%; font-size: 16px; font-weight: bold; }
                button:hover { background-color: #0056b3; }
                .view-link { display: block; text-align: center; margin-top: 15px; color: #007BFF; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h2 style="text-align: center; margin-top: 0;">Votre avis</h2>
                <form action="/envoyer la verification" method="POST">
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur :</label>
                        <input type="text" id="username" name="username" required placeholder="Votre pseudo ou nom">
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

// 2. Traitement de l'envoi (Route configurée sur /envoyer la verification)
app.post('/envoyer la verification', (req, res) => {
    const { username, avis } = req.body;

    // Ajout de l'avis avec la date actuelle
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
    let html = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>Avis Reçus</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 50px; background-color: #f4f4f4; }
                h1 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { background: white; padding: 15px; margin-bottom: 10px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
                .meta { color: #777; font-size: 12px; margin-bottom: 5px; }
                .content { font-size: 15px; color: #111; }
                .nav-btn { display: inline-block; padding: 10px 15px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>Liste des avis reçus :</h1>
    `;

    if (listeAvis.length === 0) {
        html += '<p>Aucun avis n\'a encore été reçu.</p>';
    } else {
        html += '<ul>';
        listeAvis.forEach(item => {
            html += `
                <li>
                    <div class="meta">Par <strong>${item.username}</strong> le ${item.date}</div>
                    <div class="content">${item.avis}</div>
                </li>
            `;
        });
        html += '</ul>';
    }

    html += `
            <br>
            <a class="nav-btn" href="/">Retour au formulaire</a>
        </body>
        </html>
    `;
    res.send(html);
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur actif sur le port ${PORT}`);
});

