import { Request, Response } from 'express';
import { Cuota } from '../models/Cuota.model';

export const getAllCuotas = async (req: Request, res: Response) => {
  try {
    const cuotas = await Cuota.findAll();
    res.json(cuotas);
  } catch (error) {
    console.error('Error al obtener cuotas:', error);
    res.status(500).json({ error: 'Hubo un error al obtener las cuotas' });
  }
}

export const createCuota = async (req: Request, res: Response) => {
  try {
    const nuevaCuota = await Cuota.create(req.body);
    res.status(201).json(nuevaCuota);
  } catch (error) {
    console.error('Error al crear cuota:', error);
    res.status(500).json({ error: 'Hubo un error al crear la cuota' });
  }
}

export const getCuotaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cuota = await Cuota.findByPk(id);
    if (cuota) {
      res.json(cuota);
    } else {
      res.status(404).json({ error: 'Cuota no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener cuota por ID:', error);
    res.status(500).json({ error: 'Hubo un error al obtener la cuota' });
  }
}

export const updateCuota = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [numRowsUpdated, updatedCuota] = await Cuota.update(req.body, {
      where: { id },
      returning: true,
    });
    if (numRowsUpdated) {
      res.json(updatedCuota[0]);
    } else {
      res.status(404).json({ error: 'Cuota no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar cuota:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar la cuota' });
  }
}

export const deleteCuota = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const numRowsDeleted = await Cuota.destroy({ where: { id } });
    if (numRowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Cuota no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar cuota:', error);
    res.status(500).json({ error: 'Hubo un error al eliminar la cuota' });
  }
}
