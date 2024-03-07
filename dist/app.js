"use strict";
const express = require('express');
const bodyParser = require('body-parser');
require('reflect-metadata');
const { createConnection } = require('typeorm');
const relatorioRouter = require('./routes/RelatorioRoutes');
const path = require('path');
// Criação da conexão com o banco de dados
createConnection()
    .then(() => {
    // Inicializa o servidor Express
    const app = express();
    const port = 3000; // Porta do servidor
    // Middleware para parsear o corpo das requisições em JSON
    app.use(bodyParser.json());
    // Define as rotas da aplicação
    app.use('/api', relatorioRouter);
    // Define o EJS como mecanismo de visualização
    app.set('view engine', 'ejs');
    // Define o diretório onde estão localizadas as views
    app.set('views', path.join(__dirname, 'views'));
    // Inicia o servidor
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
})
    .catch((error) => console.error('Erro na conexão com o banco de dados:', error));
