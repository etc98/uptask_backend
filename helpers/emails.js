import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {

    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: 'UpTask - COnfirmacion de cuenta',
        text: 'Comprueba tu cuenta en UpTask',
        html: `
            <p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
            <p>Si no creaste esta cuenta pudes ignorar el mensaje</p>
        `
    });

}

export const emailOlvidePassword = async (datos) => {

    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: 'UpTask - Resstablece Password',
        text: 'Comprueba tu cuenta en UpTask',
        html: `
            <p>Hola: ${nombre} has solicitado resstablecer tu password</p>
            <p>Da click en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablcer password</a></p>
            <p>Si no solicitaste este email pudes ignorar el mensaje</p>
        `
    });

}