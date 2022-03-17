import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJwt from '../helpers/generarJWT.js';
import { emailOlvidePassword, emailRegistro } from '../helpers/emails.js';

const usuarios = (req, res) => {
    res.json({ msg: 'Desde API/Usuarios' });
};

const registrar = async (req, res) => {

    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        res.json({ msg: 'Usuario Creado Correctamente, Revisa tu email para confirmar tu cuenta' });
    } catch (error) {
        console.log(`error: ${error.message}`);
        return res.status(500).json({ msg: 'Error interno' });
    }

};

const autenticar = async (req, res) => {

    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error('El usuario no fue encontrado');
        return res.status(400).json({ msg: error.message });
    }

    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJwt(usuario._id)
        })
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({ msg: error.message });
    }

};

const confirmar = async (req, res) => {

    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        res.json({ msg: 'Usuario Confirmado Correctamente' })
    } catch (error) {
        console.log(`error: ${error.message}`);
        return res.status(500).json({ msg: 'Error interno' });
    }

};

const recuperarPassword = async (req, res) => {

    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save()

        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        });

        res.json({ msg: 'Hemos enviado un email con las intrucciones para recuperar su contraseña' });
    } catch (error) {
        console.log(`error: ${error.message}`);
        return res.status(500).json({ msg: 'Error interno' });
    }

};

const comprobarToken = async (req, res) => {

    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });

    if (!tokenValido) {
        const error = new Error('El token no es valido');
        return res.status(400).json({ msg: error.message });
    }

    res.json({msg: 'Token valido y usuario existente'});

};

const nuevoPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;
    const usuario = await Usuario.findOne({ token });

    if (!usuario) {
        const error = new Error('El token no es valido');
        return res.status(400).json({ msg: error.message });
    }

    usuario.password = password;
    usuario.token = '';

    try {
        await usuario.save();
        res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
        console.log(`error: ${error.message}`);
        return res.status(500).json({ msg: 'Error interno' });
    }

};

const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
};

export {
    usuarios,
    registrar,
    autenticar,
    confirmar,
    recuperarPassword,
    comprobarToken,
    nuevoPassword,
    perfil,
};