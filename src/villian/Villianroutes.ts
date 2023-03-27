import { Router } from "express";
import { getAll, getByAlte, create, remove, update, getById } from "./villianController";
import { check } from "express-validator";

export const villianRoute = Router();

villianRoute.get('/', getAll);

villianRoute.get('/:id', getById);

villianRoute.get('/alte/:alte', getByAlte);

villianRoute.post('/', create);

villianRoute.delete('/:id', remove);

villianRoute.put('/:id', update);
