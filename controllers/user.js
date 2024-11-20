const { query } = require('express');
const { ejecutarConsulta } = require('../database/config');
const mysql = require('mysql');  // Importa mysql para usar mysql.format

const updateUser = async (req, res) => {
    const { nombre, apellidos, phone,email } = req.body;
    console.log(email)
    const query = `UPDATE usuarios SET nombre = ?, apellidos = ?, phone = ? WHERE email = ?`;
    const values = [nombre, apellidos, phone, email];

    // Formatea la consulta para evitar problemas con los parámetros
    const formattedQuery = mysql.format(query, values);

    try {
        // Ejecuta la consulta formateada
        const result = await ejecutarConsulta(formattedQuery);

        if (result.affectedRows > 0) {
            console.log(result)
            const user={
                nombre,
                apellidos,
                phone,
                email,
            }

            return res.json({ ok: true, msg: 'Usuario actualizado correctamente' });
        } else {
            return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};

const updateEstadoUsuario = async (req, res) => {
    const {estado,email} = req.body
    const query = `UPDATE usuarios SET estado = ? WHERE email = ?`;
    const values = [estado,email];

    // Formatea la consulta para evitar problemas con los parámetros
    const formattedQuery = mysql.format(query, values);

    try {
        // Ejecuta la consulta formateada
        const result = await ejecutarConsulta(formattedQuery);

        console.log(estado)
        console.log(email)

        if (result.affectedRows > 0) {
            return res.json({ ok: true, msg: 'Usuario actualizado correctamente' });
        } else {
            return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};

const getAllUsers = async(req,res)=>{
    try {
        const query = 'SELECT * FROM usuarios'
        const result = await ejecutarConsulta(query)
        console.log(result[0])

        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ ok: false, msg: 'No hay usuarios registrados' });
        }
    } catch (error) {
        console.error('Error al encontrar los usuarios:', error);
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
}

module.exports = {
    updateUser,
    updateEstadoUsuario,
    getAllUsers
};
