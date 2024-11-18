const { ejecutarConsulta } = require('../database/config'); // Conexión a la base de datos
const mysql = require('mysql');

// Controlador para obtener las notificaciones paginadas
const obtenerNotificacionesPaginadas = async (req, res) => {
    let { page, limit } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({ message: 'Parámetros de paginación inválidos' });
    }

    const offset = (page - 1) * limit;

    try {
        const query = `
            SELECT 
                ID AS notificationId,
                Titulo,
                Contenido,
                Descripcion
            FROM notificación
            ORDER BY ID DESC
            LIMIT ${limit} OFFSET ${offset}
        `;

        const notifications = await ejecutarConsulta(query);

        // Obtener el total de notificaciones para calcular el número de páginas
        const totalNotificationsQuery = 'SELECT COUNT(*) AS total FROM notificación';
        const totalNotificationsResult = await ejecutarConsulta(totalNotificationsQuery);
        const totalPages = Math.ceil(totalNotificationsResult[0].total / limit);

        res.json({
            notifications,
            totalPages
        });
    } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
};

module.exports = {
    obtenerNotificacionesPaginadas,
};
