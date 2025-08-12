// config/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestion des Tâches d\'une Équipe',
      version: '1.0.0',
      description: 'Documentation de l’API pour gérer les utilisateurs et les tâches',
      contact: {
        name: 'Ton Nom',
        email: 'ton.email@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Serveur local'
      }
    ]
  },
  apis: ['./routes/*.js'], // Chemin vers les routes où on mettra la doc
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
