import express from 'express';
import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
} from '../controllers/tareaController.js'
import checkAuth from '../middleware/checkAuth.js';

const tareaRoutes = express.Router();

tareaRoutes.post('/', checkAuth, agregarTarea);

tareaRoutes
    .route('/:id')
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea);

tareaRoutes.post('/estado/:id', checkAuth, cambiarEstado);

export default tareaRoutes;