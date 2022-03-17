import express from 'express';
import {
    autenticar,
    comprobarToken,
    confirmar,
    nuevoPassword,
    perfil,
    recuperarPassword,
    registrar,
    usuarios
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

const usuarioRoutes = express.Router();

usuarioRoutes.get('/', usuarios);
usuarioRoutes.post('/', registrar);
usuarioRoutes.post('/login', autenticar);
usuarioRoutes.get('/confirmar/:token', confirmar);
usuarioRoutes.post('/recuperar-password', recuperarPassword);
usuarioRoutes.get('/recuperar-password/:token', comprobarToken);
usuarioRoutes.post('/recuperar-password/:token', nuevoPassword);
usuarioRoutes.get('/perfil', checkAuth, perfil);

export default usuarioRoutes;