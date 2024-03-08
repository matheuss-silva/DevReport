// src/controllers/RelatorioController.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Relatorio } from '../models/Relatorio'; // Importe seu modelo TypeORM aqui


export const getRelatorios = async (req: Request, res: Response) => {
  const relatorioRepository = getRepository(Relatorio);
  const relatorios = await relatorioRepository.find();
  // Renderiza a view 'relatorios.ejs' e passa os dados dos relatórios para ela
  res.render('relatorios', { relatorios });
};

export const getRelatorioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const relatorioRepository = getRepository(Relatorio);
  const relatorio = await relatorioRepository.findOne({ where: { id: parseInt(id) } });

  if (relatorio) {
    res.json(relatorio);
  } else {
    res.status(404).json({ message: "Relatório não encontrado!" });
  }
};

export const createRelatorio = async (req: Request, res: Response) => {
  try {
    const relatorioRepository = getRepository(Relatorio);

    // Cria uma nova instância do relatório com os dados da requisição
    const relatorio = relatorioRepository.create(req.body);

    // Salva a nova instância no banco de dados
    await relatorioRepository.save(relatorio);

    // Responde com o relatório criado
    res.status(201).json(relatorio);
    console.log('Novo relatório adicionado com sucesso!');
  } catch (error) {
    console.error('Erro:', error);
    // Responde com erro 500 e mensagem
    res.status(500).json({ message: 'Erro ao criar o relatório' });
  }
};

export const updateRelatorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const relatorioRepository = getRepository(Relatorio);
  let relatorio = await relatorioRepository.findOne({ where: { id: parseInt(id) } });
  if (relatorio) {
    relatorioRepository.merge(relatorio, req.body);
    const results = await relatorioRepository.save(relatorio);
    res.json(results);
  } else {
    res.status(404).json({ message: "Relatório não encontrado!" });
  }
};

export const deleteRelatorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const relatorioRepository = getRepository(Relatorio);
  const results = await relatorioRepository.delete(id);
  return res.json(results);
};
