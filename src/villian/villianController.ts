import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Villian } from "../villian/villianModels/villian.entity";

const heroRepository = AppDataSource.getRepository(Villian);

export const getAll = async (req: Request, res: Response) => {

    const villians = await heroRepository.find();
    return res.json(villians);
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const villian= await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!villian) {
        return res.status(404).json({
            message: `Hero with id: ${id}, not found`
        })
    }

    res.json(villian);
}

export const getByAlte = async (req: Request, res: Response) => {
    const { alte } = req.params;

    const hero = await heroRepository.findOneBy({ alte });

    if (!Villian) {
        return res.status(404).json({
            message: `Hero with Alte: ${alte}, not found`
        })
    }

    res.json(Villian);
}

export const create = async (req: Request, res: Response) => {

    const { alte, nombre } = req.body;

    const oldVillian = await heroRepository.findOneBy({ alte });

    if (oldVillian) {
        return res
            .status(400)
            .json({
                message: `Hero ${alte} already exists`
            })
    }

    const newVillian = heroRepository.create({ alte, nombre });
    await heroRepository.insert(newVillian);

    res.json(newVillian);
}

export const remove = async (req: Request, res: Response) => {

    const { id } = req.params;

    const oldVillian = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!oldVillian) {
        return res
            .status(404)
            .json({
                message: `Hero with id: ${id} not found`
            })
    }

    const deletedVillian = await heroRepository.delete({ id: Number.parseInt(id) });

    res.json({
        affectedRows: deletedVillian.affected,
    });
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { alte, nombre } = req.body;

    const villianById = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!villianById) {
        return res
            .status(404)
            .json({
                message: `Hero with id ${id} not found`
            })
    }

    if (alte) {
        const oldVillian = await heroRepository.findOneBy({ alte });

        if (oldVillian && oldVillian.id !== Number.parseInt(id)) {
            return res
                .status(400)
                .json({
                    message: `Hero ${alte} already exists`
                })
        }
    }

    const updatedHero = heroRepository.create({
        id: villianById.id,
        alte: alte ? alte : villianById.alte,
        nombre: nombre ? nombre : villianById.nombre
    });

    await heroRepository.save(updatedHero);

    res.json(updatedHero);
}
