const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    // Obtener el token de los headers
    const token = req.header('x-token');

    if (!token) {
        console.log("Error: No token found");
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
    }

    try {
        // Verificar y decodificar el token
        const { email, name, apellidos } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        // Asignar los valores decodificados a req
        req.email = email;
        req.name = name;
        req.apellidos = apellidos;

        // Continuar con la siguiente función
        next();
    } catch (error) {
        console.log("Error: Token no válido");
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }
};

module.exports = {
    validarJWT
};
