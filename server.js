// Chargement des variables d'environnement (.env)
require('dotenv').config();

// Import
const http = require('http');

// Variable d'env
const { PORT } = process.env;

// Création du serveur
const server = http.createServer((request, response) => {
   // TODO Faire le traitement du serveur après la pause de midi 🍔
});

// Démarrer le serveur
server.listen(PORT, () => {
    console.log(`Web Server start on port ${PORT}`);
});
