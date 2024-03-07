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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRelatorio = exports.updateRelatorio = exports.createRelatorio = exports.getRelatorioById = exports.getRelatorios = void 0;
const typeorm_1 = require("typeorm");
const Relatorio_1 = require("../models/Relatorio"); // Importe seu modelo TypeORM aqui
const getRelatorios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const relatorioRepository = (0, typeorm_1.getRepository)(Relatorio_1.Relatorio);
    const relatorios = yield relatorioRepository.find();
    // Renderiza a view 'relatorios.ejs' e passa os dados dos relatórios para ela
    res.render('relatorios', { relatorios });
});
exports.getRelatorios = getRelatorios;
const getRelatorioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const relatorioRepository = (0, typeorm_1.getRepository)(Relatorio_1.Relatorio);
    const relatorio = yield relatorioRepository.findOne({ where: { id: parseInt(id) } });
    if (relatorio) {
        res.json(relatorio);
    }
    else {
        res.status(404).json({ message: "Relatório não encontrado!" });
    }
});
exports.getRelatorioById = getRelatorioById;
const createRelatorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const relatorioRepository = (0, typeorm_1.getRepository)(Relatorio_1.Relatorio);
    const relatorio = relatorioRepository.create(req.body);
    yield relatorioRepository.save(relatorio);
    res.status(201).json(relatorio);
});
exports.createRelatorio = createRelatorio;
const updateRelatorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const relatorioRepository = (0, typeorm_1.getRepository)(Relatorio_1.Relatorio);
    let relatorio = yield relatorioRepository.findOne({ where: { id: parseInt(id) } });
    if (relatorio) {
        relatorioRepository.merge(relatorio, req.body);
        const results = yield relatorioRepository.save(relatorio);
        res.json(results);
    }
    else {
        res.status(404).json({ message: "Relatório não encontrado!" });
    }
});
exports.updateRelatorio = updateRelatorio;
const deleteRelatorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const relatorioRepository = (0, typeorm_1.getRepository)(Relatorio_1.Relatorio);
    const results = yield relatorioRepository.delete(id);
    return res.json(results);
});
exports.deleteRelatorio = deleteRelatorio;
