"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Relatorio_1 = require("./models/Relatorio");
const bodyParser = require('body-parser');
require('reflect-metadata');
const { createConnection } = require('typeorm');
const relatorioRouter = require('./routes/RelatorioRoutes');
const path = require('path');
// Criação da conexão com o banco de dados
createConnection()
    .then(() => {
    // Inicializa o servidor Express
    const app = (0, express_1.default)();
    const port = 3000; // Porta do servidor
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const results = yield (0, typeorm_1.getRepository)(Relatorio_1.Relatorio).find();
            res.render('index', { Relatorio: Relatorio_1.Relatorio }); // Renderiza a página index.ejs com os dados dos relatórios
            res.json(results);
        }
        catch (error) {
            console.error('Erro ao buscar dados:', error);
            res.status(500).json({ message: 'Erro ao buscar dados', error: String(error) });
        }
    }));
    app.get('/relatorio', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const relatorios = yield (0, typeorm_1.getRepository)(Relatorio_1.Relatorio).find();
            res.json(relatorios);
        }
        catch (error) {
            console.error('Erro ao buscar dados:', error);
            res.status(500).json({ message: 'Erro ao buscar dados', error: String(error) });
        }
    }));
    // Middleware para parsear o corpo das requisições em JSON
    app.use(bodyParser.json());
    // Define as rotas da aplicação
    app.use('/api', relatorioRouter);
    app.use(express_1.default.static('public'));
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
