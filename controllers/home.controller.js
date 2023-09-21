const ejs = require('ejs');
const querystring = require('querystring');
const mssql = require('mssql')
const { createDbConnection } = require('../utils/db.utils');

const homeController = {

    index: async (req, res) => {
        //! Page d'accueil → Liste des message

        // Récuperation des données depuis la DB
        const db = await createDbConnection();
        const result = await db.query('SELECT * FROM Message')
        
        // Formattage des données pour l'utilisation (mapping)
        const messages = result.recordset.map(row => {
            return {
                id : row['MessageId'],
                pseudo: row['Pseudo'],
                content: row['Content'],
                createDate: row['CreateDate']
            }
        });
        
        // Rendu de la page (Callback)
        //? Pour obtenir le repertoire racine → "require.main.path" 
        ejs.renderFile(`${require.main.path}/views/home/index.ejs`, { messages }, (error, pageRender) => {
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
        
        //* Récuperer les données du POST
        let body = '';
        req.on('data', formData => {
            body += formData.toString();
        });

        //* Traitement après la récéption des données
        req.on('end', async () => {
            const data = querystring.parse(body);
            console.log(body);
            console.log(data);

            const db = await createDbConnection();

            //! Requete SQL préparé, pour éviter la fail de sécurité "Injection SQL"
            const sqlQuery = new mssql.PreparedStatement(db);
            // Définition des types de parametres
            sqlQuery.input('pseudo', mssql.NVarChar);
            sqlQuery.input('content', mssql.NVarChar);
            sqlQuery.input('email', mssql.NVarChar);
            // Préparation de la requete
            await sqlQuery.prepare('INSERT INTO [Message](Pseudo, Content, Email) VALUES(@pseudo, @content, @email)');
            // Execution de la requete
            await sqlQuery.execute(data);

            //! Redirection vers la page d'accueil
            res.writeHead(302, { location: '/' });
            res.end();
        })
    }
};

module.exports = homeController;