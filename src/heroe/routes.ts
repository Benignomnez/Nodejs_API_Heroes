import { Router } from "express";
import { getAll, getByAlte, create, remove, update, getById } from "./controller";
import { check } from "express-validator";

export const heroeRoute = Router();

heroeRoute.get('/', getAll);

heroeRoute.get('/:id', getById);

heroeRoute.get('/alte/:alte', getByAlte);

heroeRoute.post('/', create);

heroeRoute.delete('/:id', remove);

heroeRoute.put('/:id', update);
