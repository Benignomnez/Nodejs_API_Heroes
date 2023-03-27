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
exports.update = exports.remove = exports.create = exports.getByAlte = exports.getById = exports.getAll = void 0;
const datasource_1 = require("../../datasource");
const villian_entity_1 = require("../villian/villianModels/villian.entity");
const heroRepository = datasource_1.AppDataSource.getRepository(villian_entity_1.Villian);
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const villians = yield heroRepository.find();
    return res.json(villians);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const villian = yield heroRepository.findOneBy({ id: Number.parseInt(id) });
    if (!villian) {
        return res.status(404).json({
            message: `Hero with id: ${id}, not found`
        });
    }
    res.json(villian);
});
exports.getById = getById;
const getByAlte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alte } = req.params;
    const hero = yield heroRepository.findOneBy({ alte });
    if (!villian_entity_1.Villian) {
        return res.status(404).json({
            message: `Hero with Alte: ${alte}, not found`
        });
    }
    res.json(villian_entity_1.Villian);
});
exports.getByAlte = getByAlte;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alte, nombre } = req.body;
    const oldVillian = yield heroRepository.findOneBy({ alte });
    if (oldVillian) {
        return res
            .status(400)
            .json({
            message: `Hero ${alte} already exists`
        });
    }
    const newVillian = heroRepository.create({ alte, nombre });
    yield heroRepository.insert(newVillian);
    res.json(newVillian);
});
exports.create = create;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oldVillian = yield heroRepository.findOneBy({ id: Number.parseInt(id) });
    if (!oldVillian) {
        return res
            .status(404)
            .json({
            message: `Hero with id: ${id} not found`
        });
    }
    const deletedVillian = yield heroRepository.delete({ id: Number.parseInt(id) });
    res.json({
        affectedRows: deletedVillian.affected,
    });
});
exports.remove = remove;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { alte, nombre } = req.body;
    const villianById = yield heroRepository.findOneBy({ id: Number.parseInt(id) });
    if (!villianById) {
        return res
            .status(404)
            .json({
            message: `Hero with id ${id} not found`
        });
    }
    if (alte) {
        const oldVillian = yield heroRepository.findOneBy({ alte });
        if (oldVillian && oldVillian.id !== Number.parseInt(id)) {
            return res
                .status(400)
                .json({
                message: `Hero ${alte} already exists`
            });
        }
    }
    const updatedHero = heroRepository.create({
        id: villianById.id,
        alte: alte ? alte : villianById.alte,
        nombre: nombre ? nombre : villianById.nombre
    });
    yield heroRepository.save(updatedHero);
    res.json(updatedHero);
});
exports.update = update;
