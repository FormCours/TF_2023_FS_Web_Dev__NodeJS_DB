// Chargement des variables d'environnement (.env)
require('dotenv').config();

// Import
const http = require('http');
const homeController = require('./controllers/home.controller');

// Variable d'env
const { PORT } = process.env;

// Création du serveur
const server = http.createServer((request, response) => {

    // Info de la requete
    console.log(`url: "${request.url}" • method: "${request.method}"`);

    // Routing simple (Méthode plus complexe vu avec "Express")
    if(request.url === '/') {
        // Appel de la méthode "index" en lui transmettant la requete et la réponse
        homeController.index(request, response);
    }
    else if(request.url === '/message-add' && request.method === "GET") {
        homeController.messageGET(request, response);
    }
    else if(request.url === '/message-add' && request.method === "POST") {
        homeController.messagePOST(request, response);
    }
    else {
        // Génération simple d'une page d'erreur 404 !
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>Page not found</h1>")
    }
});

// Démarrer le serveur
server.listen(PORT, () => {
    console.log(`Web Server start on port ${PORT}`);
});
