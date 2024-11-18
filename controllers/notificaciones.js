const { ejecutarConsulta } = require('../database/config'); // Importa tu función personalizada para consultas
const mysql = require('mysql');
// Obtener todas las notificaciones
const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await ejecutarConsulta('SELECT * FROM notificaciones');
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

// Crear una nueva notificación
const crearNotificacion = async (req, res) => {
  const { Titulo, Contenido, ID_Usuario, Link, Descripcion } = req.body;

  try {
    const query = `
      INSERT INTO notificaciones (Titulo, Contenido, ID_Usuario, Link, Descripcion)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [Titulo, Contenido, ID_Usuario, Link || null, Descripcion || null];

    const formattedQuery = mysql.format(query, params);
    const resultado = await ejecutarConsulta(formattedQuery);

    res.status(201).json({
      ok: true,
      msg: 'Notificación creada exitosamente',
      notificacionId: resultado.insertId,
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
  const { Titulo, Contenido, ID_Usuario, Link, Descripcion } = req.body;

  try {
    const query = `
      UPDATE notificaciones
      SET Titulo = ?, Contenido = ?, ID_Usuario = ?, Link = ?, Descripcion = ?
      WHERE ID = ?
    `;
    const params = [Titulo, Contenido, ID_Usuario, Link, Descripcion, id];
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
    const query = 'DELETE FROM notificaciones WHERE ID = ?';
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
  getNotificaciones,
  crearNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
};
