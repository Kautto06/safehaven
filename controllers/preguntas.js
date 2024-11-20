const mysql = require('mysql')
const { ejecutarConsulta } = require('../database/config'); // Configuración para ejecutar consultas en la BD

// Obtener todas las preguntas
const getPreguntas = async (req, res) => {
  try {
    const query = `
      SELECT ID, Pregunta
      FROM preguntas
    `;
    const result = await ejecutarConsulta(query);

    res.json(result);
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    res.status(500).json({ message: "Error al obtener las preguntas" });
  }
};

const getPreguntasPorId = async (req, res) => {
  const {id} = req.params

  try {
    const query = `
      SELECT ID, Pregunta
      FROM preguntas p
      WHERE p.ID = ?
    `;
    const formattedQuery = mysql.format(query, [id]);

    const result = await ejecutarConsulta(formattedQuery);

    res.json(result);
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    res.status(500).json({ message: "Error al obtener las preguntas" });
  }
};

const getPreguntasConOpciones = async (req, res) => {
  try {
    const query = `
      SELECT p.ID, p.Pregunta, o.ID as OpcionID, o.Opcion
      FROM preguntas p
      LEFT JOIN opciones o ON p.ID = o.ID_Pregunta
    `;
    const result = await ejecutarConsulta(query);

    const preguntas = result.reduce((acc, row) => {
      const { ID, Pregunta, OpcionID, Opcion } = row;
      const existingQuestion = acc.find((q) => q.id === ID);
      
      if (existingQuestion) {
        existingQuestion.options.push({ id: OpcionID, option: Opcion });
      } else {
        acc.push({
          id: ID,
          label: Pregunta,
          options: [{ id: OpcionID, option: Opcion }]
        });
      }
      
      return acc;
    }, []);
    
    res.json({ questions: preguntas });
  } catch (error) {
    console.error("Error al obtener las preguntas con opciones:", error);
    res.status(500).json({ message: "Error al obtener las preguntas y opciones" });
  }
};


// Crear una nueva pregunta
const crearPregunta = async (req, res) => {
  const { pregunta } = req.body;

  try {
    const query = `
      INSERT INTO preguntas (Pregunta)
      VALUES (?)
    `;
    const formattedQuery = mysql.format(query, [pregunta]);

    const result = await ejecutarConsulta(formattedQuery);

    res.status(201).json({
      message: "Pregunta creada exitosamente",
      PreguntaID: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la pregunta:", error);
    res.status(500).json({ message: "Error al crear la pregunta" });
  }
};

// Actualizar una pregunta
const actualizarPregunta = async (req, res) => {
  const { id } = req.params;
  const { pregunta } = req.body;

  try {
    const query = `
      UPDATE preguntas
      SET Pregunta = ?
      WHERE ID = ?
    `;
    const values = [pregunta, id];
    const formattedQuery = mysql.format(query, values);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    res.json({ message: "Pregunta actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la pregunta:", error);
    res.status(500).json({ message: "Error al actualizar la pregunta" });
  }
};

// Eliminar una pregunta
const eliminarPregunta = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM preguntas
      WHERE ID = ?
    `;
    const formattedQuery = mysql.format(query, [id]);
    const result = await ejecutarConsulta(formattedQuery);


    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    res.json({ message: "Pregunta eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la pregunta:", error);
    res.status(500).json({ message: "Error al eliminar la pregunta" });
  }
};

module.exports = {
  getPreguntas,
  crearPregunta,
  actualizarPregunta,
  eliminarPregunta,
  getPreguntasPorId,
  getPreguntasConOpciones
};