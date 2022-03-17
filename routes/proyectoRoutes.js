import express from 'express';
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    buscarColaborador
} from '../controllers/proyectoController.js';
import checkAuth from '../middleware/checkAuth.js';

const proyectoRoutes = express.Router();

proyectoRoutes.get('/', checkAuth, obtenerProyectos);
proyectoRoutes.post('/', checkAuth, nuevoProyecto);

proyectoRoutes
    .route('/')
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto);

proyectoRoutes
    .route('/:id')
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto);

proyectoRoutes.post('/colaboradores', checkAuth, buscarColaborador);
proyectoRoutes.post('/colaboradores/:id', checkAuth, agregarColaborador);
proyectoRoutes.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador);

export default proyectoRoutes;