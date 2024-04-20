import { Request, Response } from 'express';
import { Alergia } from '../models/Alergia.model';

export const getAllAlergias = async (req: Request, res: Response) => {
  try {
    const alergias = await Alergia.findAll();
    res.json(alergias);
  } catch (error) {
    console.error('Error al obtener alergias:', error);
    res.status(500).json({ error: 'Hubo un error al obtener las alergias' });
  }
}

export const createAlergia = async (req: Request, res: Response) => {
  try {
    const nuevaAlergia = await Alergia.create(req.body);
    res.status(201).json(nuevaAlergia);
  } catch (error) {
    console.error('Error al crear alergia:', error);
    res.status(500).json({ error: 'Hubo un error al crear la alergia' });
  }
}

export const getAlergiaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const alergia = await Alergia.findByPk(id);
    if (alergia) {
      res.json(alergia);
    } else {
      res.status(404).json({ error: 'Alergia no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener alergia por ID:', error);
    res.status(500).json({ error: 'Hubo un error al obtener la alergia' });
  }
}

export const updateAlergia = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [numRowsUpdated, updatedAlergia] = await Alergia.update(req.body, {
      where: { id },
      returning: true,
    });
    if (numRowsUpdated) {
      res.json(updatedAlergia[0]);
    } else {
      res.status(404).json({ error: 'Alergia no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar alergia:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar la alergia' });
  }
}

export const deleteAlergia = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const numRowsDeleted = await Alergia.destroy({ where: { id } });
    if (numRowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Alergia no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar alergia:', error);
    res.status(500).json({ error: 'Hubo un error al eliminar la alergia' });
  }
}
