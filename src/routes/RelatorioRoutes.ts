// src/routes/RelatorioRoutes.ts
import { Router } from 'express';
import { getRelatorios, createRelatorio, getRelatorioById, updateRelatorio, deleteRelatorio } from '../controllers/RelatorioController';

const router = Router();

// Pegar todos os relatórios
router.get('/relatorios', getRelatorios);

// Pegar um relatório pelo ID
router.get('/relatorios/:id', getRelatorioById);

// Criar um novo relatório
router.post('/relatorios', createRelatorio);

// Atualizar um relatório pelo ID
router.put('/relatorios/:id', updateRelatorio);

// Deletar um relatório pelo ID
router.delete('/relatorios/:id', deleteRelatorio);

export default router;
