const ejs = require('ejs');

const homeController = {

    index: (req, res) => {
        //! Page d'accueil → Liste des message

        // "require.main.path" permet d'obtenir le repertoire racine

        // Rendu de la page (Callback)
        ejs.renderFile(`${require.main.path}/views/home/index.ejs`, (error, pageRender) => {
            //* Erreur lors de la génération du rendu
            if(error) {
                console.error(error);

                res.writeHead(500);
                res.end();
                return;
            }

            //* Génération de la vue réussi !
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(pageRender);
        });
    },

    messageGET: (req, res) => {
        //! Page de formulaire

        // Rendu de la page (Promise)
        ejs.renderFile(`${require.main.path}/views/home/message-form.ejs`)
            .then(pageRender => {
                //* Génération de la vue réussi !
                res.writeHead(200, { 'Content-Type': 'text/html'});
                res.end(pageRender);
            })
            .catch(error => {
                //* Erreur lors de la génération du rendu
                res.writeHead(500);
                res.end();
            });
    },

    messagePOST: (req, res) => {
        //! Traitement des données du formulaire

    }
};

module.exports = homeController;