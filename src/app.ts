import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Relatorio } from './models/Relatorio';
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

    app.get('/', async (req: Request, res: Response) => {
      try {
        const results = await getRepository(Relatorio).find();
        res.render('index', { Relatorio }); // Renderiza a página index.ejs com os dados dos relatórios
        res.json(results);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ message: 'Erro ao buscar dados', error: String(error) });
      }
    });

    app.get('/relatorio', async (req, res) => {
      try {
        const relatorios = await getRepository(Relatorio).find();
        res.json(relatorios);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ message: 'Erro ao buscar dados', error: String(error) });
      }
    });
    
    // Middleware para parsear o corpo das requisições em JSON
    app.use(bodyParser.json());

    // Define as rotas da aplicação
    app.use('/api', relatorioRouter);

    app.use(express.static('public'));

    // Define o EJS como mecanismo de visualização
    app.set('view engine', 'ejs');
    // Define o diretório onde estão localizadas as views
    app.set('views', path.join(__dirname, 'views'));

    // Inicia o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error: Error) => console.error('Erro na conexão com o banco de dados:', error));

