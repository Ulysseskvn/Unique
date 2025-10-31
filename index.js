// Arquivo necessário para o Vercel reconhecer as rotas da API
// Importa o app Express do server.js
const app = require('../server');

// Exporta como handler para Vercel
module.exports = app;

