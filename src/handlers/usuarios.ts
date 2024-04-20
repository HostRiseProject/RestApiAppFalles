import { Alergia, Cuota, Evento, Usuario } from "../models/Usuario.model";
import { Request, Response } from 'express';

// Obtener todos los usuarios
export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
  }
}

// Crear un nuevo usuario
export async function createUsuario(req: Request, res: Response) {
    try {
      // Paso 1: Crear el usuario
      const nuevoUsuario = await Usuario.create(req.body);
  
      // Paso 2: Crear y asociar las alergias al usuario
      const alergias = req.body.alergias || [];
      const alergiasIds = [];
      for (const alergiaData of alergias) {
        const nuevaAlergia = await Alergia.create(alergiaData);
        alergiasIds.push(nuevaAlergia.id);
        nuevoUsuario.setAlergias(nuevaAlergia);
      }
      
  
      // Paso 3: Crear y asociar la cuota al usuario
      const cuotaData = req.body.cuotas || {};
      const cuotas = [];
      for (const cuota of cuotaData) {
        const nuevaCuota = await Cuota.create(cuota);
        cuotas.push(nuevaCuota);
        nuevoUsuario.setCuota(nuevaCuota);
      }
      
  
      // Paso 4: Crear y asociar el evento al usuario
      const eventoData = req.body.eventos || {};
      const eventos = [];
      for (const evento of eventoData) {
        const nuevoEvento = await Evento.create(evento);
        eventos.push(nuevoEvento);
        nuevoUsuario.setEvento(nuevoEvento);
      }
  
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      console.error('Error al crear usuario con entidades asociadas:', error);
      res.status(500).json({ error: 'Hubo un error al crear el usuario con entidades asociadas' });
    }
  }


// Obtener un usuario por su ID
export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Hubo un error al obtener el usuario' });
  }
}

// Actualizar un usuario
export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [numRowsUpdated, updatedUsuario] = await Usuario.update(req.body, {
      where: { id },
      returning: true, // Devuelve el usuario actualizado
    });
    if (numRowsUpdated) {
      res.json(updatedUsuario[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar el usuario' });
  }
}

// Eliminar un usuario
export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const numRowsDeleted = await Usuario.destroy({ where: { id } });
    if (numRowsDeleted) {
      res.status(204).end(); // No hay contenido para enviar en la respuesta
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Hubo un error al eliminar el usuario' });
  }
}
