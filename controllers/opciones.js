const mysql = require('mysql2/promise');
const { ejecutarConsulta } = require('../database/config'); // Configuración para ejecutar consultas en la BD

// Obtener todas las preguntas con sus opciones
const getPreguntas = async (req, res) => {
  try {
    const query = `
      SELECT p.ID AS PreguntaID, p.Titulo, o.ID AS OpcionID, o.Opcion
      FROM preguntas p
      LEFT JOIN opciones o ON p.ID = o.PreguntaID
    `;
    const result = await ejecutarConsulta(query);

    const preguntas = result.reduce((acc, row) => {
      const pregunta = acc.find(p => p.ID === row.PreguntaID);
      if (pregunta) {
        pregunta.Opciones.push({ ID: row.OpcionID, Opcion: row.Opcion });
      } else {
        acc.push({
          ID: row.PreguntaID,
          Titulo: row.Titulo,
          Opciones: row.OpcionID ? [{ ID: row.OpcionID, Opcion: row.Opcion }] : []
        });
      }
      return acc;
    }, []);

    res.status(200).json(preguntas);
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    res.status(500).json({ message: "Error al obtener las preguntas" });
  }
};

// Crear una nueva opción
const crearOpcion = async (req, res) => {
  const { opcion, PreguntaID } = req.body;

  try {
    const query = `
      INSERT INTO opciones (Opcion, PreguntaID)
      VALUES (?, ?)
    `;
    const values = [opcion, PreguntaID];
    const formattedQuery = mysql.format(query, values);

    const result = await ejecutarConsulta(formattedQuery);

    res.status(201).json({
      message: "Opción creada exitosamente",
      OpcionID: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la opción:", error);
    res.status(500).json({ message: "Error al crear la opción" });
  }
};

// Actualizar una opción
const actualizarOpcion = async (req, res) => {
  const { id } = req.params;
  const { opcion } = req.body;

  try {
    const query = `
      UPDATE opciones
      SET Opcion = ?
      WHERE ID = ?
    `;
    const values = [opcion, id];
    const formattedQuery = mysql.format(query, values);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Opción no encontrada" });
    }

    res.json({ message: "Opción actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la opción:", error);
    res.status(500).json({ message: "Error al actualizar la opción" });
  }
};

// Eliminar una opción específica
const eliminarOpcion = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM opciones
      WHERE ID = ?
    `;
    const formattedQuery = mysql.format(query, [id]);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Opción no encontrada" });
    }

    res.json({ message: "Opción eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la opción:", error);
    res.status(500).json({ message: "Error al eliminar la opción" });
  }
};

// Eliminar todas las opciones de una pregunta específica
const eliminarOpcionesPorPregunta = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM opciones
      WHERE PreguntaID = ?
    `;
    const formattedQuery = mysql.format(query, [id]);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontraron opciones para esta pregunta" });
    }

    res.json({ message: "Opciones eliminadas exitosamente" });
  } catch (error) {
    console.error("Error al eliminar opciones por pregunta:", error);
    res.status(500).json({ message: "Error al eliminar opciones por pregunta" });
  }
};

const incrementarFrecuenciaOpcion = async (idOpcion) => {
  const OpcionId = idOpcion;

  try {
    const query = `
      UPDATE opciones
      SET frecuencia = frecuencia + 1
      WHERE ID = ?
    `;
    const values = [OpcionId];
    const formattedQuery = mysql.format(query, values);

    // Ejecuta la consulta para incrementar la frecuencia
    await ejecutarConsulta(formattedQuery);

  } catch (error) {
    console.error("Error al incrementar la frecuencia de la opción:", error);
    throw new Error("Error al incrementar la frecuencia de la opción");
  }
};

module.exports = {
  getPreguntas,
  crearOpcion,
  actualizarOpcion,
  eliminarOpcion,
  eliminarOpcionesPorPregunta,
  incrementarFrecuenciaOpcion
};
