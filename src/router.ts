import express, { Router } from 'express';
import {
  getAllUsuarios,
  createUsuario,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
} from './handlers/usuarios';

import {
  getAllEventos,
  getEventoById,
  updateEvento,
  deleteEvento,
  createEvento,
} from './handlers/evento';

import {
  getAllCuotas,
  createCuota,
  getCuotaById,
  updateCuota,
  deleteCuota,
} from './handlers/cuota';

import {
  getAllAlergias,
  createAlergia,
  getAlergiaById,
  updateAlergia,
  deleteAlergia,
} from './handlers/alergias';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = express.Router();


router.get('/', getAllUsuarios);

router.post('/usuarios',
  body('name').notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
  
  handleInputErrors,
  createUsuario
);

router.get('/usuarios/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getUsuarioById
);

router.put('/usuarios/:id',
  param('id').isInt().withMessage('ID no válido'),
  body('nombre').notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
  // Agrega más validaciones según sea necesario para otros campos
  handleInputErrors,
  updateUsuario
);

router.delete('/usuarios/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteUsuario
);


// Rutas para Eventos
router.get('/eventos', getAllEventos);

router.post('/eventos',
  // Agrega validaciones para los campos del evento según sea necesario
  handleInputErrors,
  createEvento
);

router.get('/eventos/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getEventoById
);

router.put('/eventos/:id',
  param('id').isInt().withMessage('ID no válido'),
  // Agrega validaciones para los campos del evento según sea necesario
  handleInputErrors,
  updateEvento
);

router.delete('/eventos/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteEvento
);


// Rutas para Cuotas
router.get('/cuotas', getAllCuotas);

router.post('/cuotas',
  // Agrega validaciones para los campos de la cuota según sea necesario
  handleInputErrors,
  createCuota
);

router.get('/cuotas/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getCuotaById
);

router.put('/cuotas/:id',
  param('id').isInt().withMessage('ID no válido'),
  // Agrega validaciones para los campos de la cuota según sea necesario
  handleInputErrors,
  updateCuota
);

router.delete('/cuotas/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteCuota
);

// Rutas para Alergias
router.get('/alergias', getAllAlergias);

router.post('/alergias',
  // Agrega validaciones para los campos de la alergia según sea necesario
  handleInputErrors,
  createAlergia
);

router.get('/alergias/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getAlergiaById
);

router.put('/alergias/:id',
  param('id').isInt().withMessage('ID no válido'),
  // Agrega validaciones para los campos de la alergia según sea necesario
  handleInputErrors,
  updateAlergia
);

router.delete('/alergias/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteAlergia
);

export{router} ;