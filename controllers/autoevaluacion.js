const { ejecutarConsulta } = require('../database/config');
const mysql = require('mysql');

const {guardarAccion} = require('./actividad');

// Obtener el número de intento de un usuario
const obtenerNumeroIntento = async (idUsuario) => {
    const userId = idUsuario; 
    const query = 'SELECT MAX(numero_intento) as max_intento FROM encuestas_usuarios WHERE id_usuario = ?';
    const values = [userId]; 
    const formattedQuery = mysql.format(query, values);

    try {
      const result = await ejecutarConsulta(formattedQuery); 
      return result[0].max_intento || 0; 
    } catch (error) {
      console.error('Error al obtener el número de intento:', error);
      throw error;
    }
  }

// Guardar el intento de autoevaluación
const guardarAutoevaluacion = async (idUsuario, numeroIntento) => {
  const userId = idUsuario; 
  const number = numeroIntento;

  const query = 'INSERT INTO encuestas_usuarios (id_usuario, numero_intento) VALUES (?, ?)';
  const values = [idUsuario, numeroIntento];
  const formattedQuery = mysql.format(query, values);

  try {
    // Ejecuta la consulta y obtiene el resultado
    const result = await ejecutarConsulta(formattedQuery);

    // Ahora que tenemos el insertId, podemos llamar a guardarAccion
    const autoevaluacionId = result.insertId;  // Obtiene el ID de la autoevaluación recién insertada
    await guardarAccion(idUsuario, 'AutoEvaluacion', 'AutoEvaluación realizada.', autoevaluacionId);

    return { idUsuario, numeroIntento, autoevaluacionId }; // Retorna el ID de la autoevaluación también
  } catch (error) {
    console.error('Error al guardar el intento de autoevaluación:', error);
    throw error;
  }
};

// Guardar las respuestas
const guardarRespuestas = async (idUsuario, idPregunta, idOpcion, numeroIntento) => {
  const userId = idUsuario; 
  const PreguntaId =idPregunta;
  const OpcionId = idOpcion; 
  const number =numeroIntento; 

  const query = 'INSERT INTO respuestas_usuarios (id_usuario, id_pregunta, id_opcion, numero_intento) VALUES (?, ?, ?, ?)';
  const values = [userId, PreguntaId, OpcionId, number];
  const formattedQuery = mysql.format(query, values);

  try {
    await ejecutarConsulta(formattedQuery);
  } catch (error) {
    console.error('Error al guardar las respuestas:', error);
    throw error;
  }
};

const obtenerDetallesAutoevaluacion = async (req, res) => {
  const aut_id = req.params.id_objeto;
  try {
    const query = `
      SELECT 
        e.id AS id_encuesta,
        e.id_usuario AS email,
        e.numero_intento AS intento,
        r.id_pregunta AS id_pregunta,
        r.id_opcion AS id_opcion,
        o.opcion AS texto_opcion
      FROM 
        encuestas_usuarios e
      JOIN 
        respuestas_usuarios r 
      ON 
        e.id_usuario = r.id_usuario AND e.numero_intento = r.numero_intento
      JOIN 
        opciones o
      ON 
        r.id_opcion = o.ID
      WHERE 
        e.id = ?;
    `;
    const values = [aut_id];
    const formattedQuery = mysql.format(query, values);
    const resultado = await ejecutarConsulta(formattedQuery);

    if (resultado.length === 0) {
      return res.status(404).json({ message: "No se encontraron respuestas para esta encuesta." });
    }

    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener detalles de la autoevaluación:", error);
    res.status(500).json({ message: "Error al obtener detalles de la autoevaluación" });
  }
};



module.exports = { guardarAutoevaluacion, guardarRespuestas, obtenerNumeroIntento,obtenerDetallesAutoevaluacion };