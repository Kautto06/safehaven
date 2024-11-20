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


// Obtener todas las notificaciones
const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await ejecutarConsulta('SELECT * FROM notificación');
    res.status(200).json({
      ok: true,
      notificaciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener las notificaciones',
    });
  }
};

const getNotificacionesPorId = async (req, res) => {
  const {id} = req.params
  try {
    const query = 'SELECT * FROM notificación WHERE ID = ?'
    const params = [id]
    const formattedQuery = mysql.format(query,params)
    const notificacion = await ejecutarConsulta(formattedQuery);

    res.status(200).json({
      ok: true,
      notificacion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener las notificaciones',
    });
  }
};

// Crear una nueva notificación
const crearNotificacion = async (req, res) => {
  const { Titulo, Contenido, ID_Usuario, Descripcion } = req.body;

  try {
    const query = `
      INSERT INTO notificación (Titulo, Contenido, ID_Usuario, Descripcion)
      VALUES (?, ?, ?, ?)
    `;
    const params = [Titulo, Contenido, ID_Usuario, Descripcion || null];

    const formattedQuery = mysql.format(query, params);
    const resultado = await ejecutarConsulta(formattedQuery);

    res.status(201).json({
      ok: true,
      msg: 'Notificación creada exitosamente',
      ID: resultado.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear la notificación',
    });
  }
};

// Actualizar una notificación por ID
const actualizarNotificacion = async (req, res) => {
  const { id } = req.params;
  const { Titulo, Contenido, ID_Usuario, Descripcion } = req.body;

  try {
    const query = `
      UPDATE notificación
      SET Titulo = ?, Contenido = ?, ID_Usuario = ?, Descripcion = ?
      WHERE ID = ?
    `;
    const params = [Titulo, Contenido, ID_Usuario, Descripcion, id];
    const formattedQuery = mysql.format(query, params);
    const resultado = await ejecutarConsulta(formattedQuery);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontró una notificación con ese ID',
      });
    }

    res.status(200).json({
      ok: true,
      msg: 'Notificación actualizada exitosamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar la notificación',
    });
  }
};

// Eliminar una notificación por ID
const eliminarNotificacion = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM notificación WHERE ID = ?';
    const params = [id];

    const formattedQuery = mysql.format(query, params);
    const resultado = await ejecutarConsulta(formattedQuery);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontró una notificación con ese ID',
      });
    }

    res.status(200).json({
      ok: true,
      msg: 'Notificación eliminada exitosamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar la notificación',
    });
  }
};

module.exports = {
  obtenerNotificacionesPaginadas,
  getNotificaciones,
  crearNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
  getNotificacionesPorId
};
