const mysql = require('mysql2/promise');
const { ejecutarConsulta } = require('../database/config'); // Configuración para ejecutar consultas en la BD

const getOpciones = async (req, res) => {
 // Obtener el ID de la pregunta desde los parámetros de la URL

  try {
    // Consulta SQL para obtener las opciones asociadas a una pregunta específica
    const query = `SELECT * FROM opciones`;
    
    // Ejecutar la consulta con el ID de la pregunta
    const result = await ejecutarConsulta(query);

    // Si no se encuentran opciones para la pregunta, devolver un mensaje de error
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron opciones para esta pregunta" });
    }

    // Responder con las opciones encontradas
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener las opciones:", error);
    res.status(500).json({ message: "Error al obtener las opciones" });
  }
};

const getOpcionesPorId = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la pregunta desde los parámetros de la URL

  try {
    // Consulta SQL para obtener las opciones asociadas a una pregunta específica
    const query = `
      SELECT *
      FROM opciones o
      WHERE o.ID = ?
    `;
    
    // Ejecutar la consulta con el ID de la pregunta
    const result = await ejecutarConsulta(mysql.format(query, [id]));

    // Si no se encuentran opciones para la pregunta, devolver un mensaje de error
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron opciones para esta pregunta" });
    }
    // Responder con las opciones encontradas
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener las opciones:", error);
    res.status(500).json({ message: "Error al obtener las opciones" });
  }
};

// Obtener todas las preguntas con sus opciones
const getOpcionesPorPregunta = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la pregunta desde los parámetros de la URL

  try {
    // Consulta SQL para obtener las opciones asociadas a una pregunta específica
    const query = `
      SELECT o.ID AS OpcionID, o.Opcion
      FROM opciones o
      WHERE o.ID_Pregunta = ?
    `;
    
    // Ejecutar la consulta con el ID de la pregunta
    const result = await ejecutarConsulta(mysql.format(query, [id]));

    // Si no se encuentran opciones para la pregunta, devolver un mensaje de error
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron opciones para esta pregunta" });
    }
    // Responder con las opciones encontradas
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener las opciones:", error);
    res.status(500).json({ message: "Error al obtener las opciones" });
  }
};

// Crear una nueva opción
const crearOpcion = async (req, res) => {
  const { opcion, PreguntaID } = req.body;

  try {
    const query = `
      INSERT INTO opciones (Opcion, ID_Pregunta)
      VALUES (?, ?)
    `;
    const values = [opcion, PreguntaID];
    const formattedQuery = mysql.format(query, values);
    const result = await ejecutarConsulta(formattedQuery);

    console.log(result)

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
      WHERE ID_Pregunta = ?
    `;
    const formattedQuery = mysql.format(query, [id]);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(200).json({ message: "No habian registradas opciones para esta pregunta" });
    }

    res.status(200).json({ message: "Opciones eliminadas exitosamente" });
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
  crearOpcion,
  actualizarOpcion,
  eliminarOpcion,
  eliminarOpcionesPorPregunta,
  getOpcionesPorPregunta,
  getOpciones,
  getOpcionesPorId,
  incrementarFrecuenciaOpcion
};
