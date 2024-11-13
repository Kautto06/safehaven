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

module.exports = {
    updateUser
};
