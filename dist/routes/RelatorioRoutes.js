"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/RelatorioRoutes.ts
const express_1 = require("express");
const RelatorioController_1 = require("../controllers/RelatorioController");
const router = (0, express_1.Router)();
// Pegar todos os relatórios
router.get('/relatorios', RelatorioController_1.getRelatorios);
// Pegar um relatório pelo ID
router.get('/relatorios/:id', RelatorioController_1.getRelatorioById);
// Criar um novo relatório
router.post('/relatorios', RelatorioController_1.createRelatorio);
// Atualizar um relatório pelo ID
router.put('/relatorios/:id', RelatorioController_1.updateRelatorio);
// Deletar um relatório pelo ID
router.delete('/relatorios/:id', RelatorioController_1.deleteRelatorio);
exports.default = router;
