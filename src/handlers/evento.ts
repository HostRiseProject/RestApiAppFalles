import { Request, Response } from 'express';
import { Evento } from '../models/Evento.model';

export const getAllEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ error: 'Hubo un error al obtener los eventos' });
  }
}

export async function createEvento(req: Request, res: Response) {
    try {
      const nuevoEvento = await Evento.create(req.body);
      res.status(201).json(nuevoEvento);
    } catch (error) {
      console.error('Error al crear evento:', error);
      res.status(500).json({ error: 'Hubo un error al crear el evento' });
    }
  }

export const getEventoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const evento = await Evento.findByPk(id);
    if (evento) {
      res.json(evento);
    } else {
      res.status(404).json({ error: 'Evento no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener evento por ID:', error);
    res.status(500).json({ error: 'Hubo un error al obtener el evento' });
  }
}

export const updateEvento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [numRowsUpdated, updatedEvento] = await Evento.update(req.body, {
      where: { id },
      returning: true,
    });
    if (numRowsUpdated) {
      res.json(updatedEvento[0]);
    } else {
      res.status(404).json({ error: 'Evento no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar el evento' });
  }
}

export const deleteEvento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const numRowsDeleted = await Evento.destroy({ where: { id } });
    if (numRowsDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Evento no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ error: 'Hubo un error al eliminar el evento' });
  }
}
