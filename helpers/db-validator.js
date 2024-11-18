const { ejecutarConsulta } = require('../database/config');
const mysql = require('mysql');
// Función que verifica si el ID de una notificación existe
const validarNotificacionExistente = async (id) => {
  try {
    const query = 'SELECT 1 FROM notificaciones WHERE ID = ? LIMIT 1';
    const params = [id]
      const formattedQuery = mysql.format(query, params);
      const result = await ejecutarConsulta(formattedQuery);

    if (result.length === 0) {
      throw new Error(`No se encontró una notificación con el ID ${id}`);
    }
  } catch (error) {
    throw new Error(error.message || 'Error al validar la existencia de la notificación');
  }
};

// Función que verifica si el ID de un evento existe
const validarEventoExistente = async (id) => {
    try {
      const query = 'SELECT 1 FROM eventos WHERE ID = ? LIMIT 1';
      const params = [id]
      const formattedQuery = mysql.format(query, params);
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.length === 0) {
        throw new Error(`No se encontró un evento con el ID ${id}`);
      }
    } catch (error) {
      throw new Error(error.message || 'Error al validar la existencia del evento');
    }
  };

  // Función que verifica si el ID de un experto existe
const validarExpertoExistente = async (id) => {
    try {
      const query = 'SELECT 1 FROM expertos WHERE ID = ? LIMIT 1';
      const params = [id]
      const formattedQuery = mysql.format(query, params);
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.length === 0) {
        throw new Error(`No se encontró un experto con el ID ${id}`);
      }
    } catch (error) {
      throw new Error(error.message || 'Error al validar la existencia del experto');
    }
};

const validarOpcionExistente = async (id) => {
    try {
      const query = 'SELECT 1 FROM opciones WHERE ID = ? LIMIT 1';
      const params = [id]
      const formattedQuery = mysql.format(query, params);
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.length === 0) {
        throw new Error(`No se encontró una opción con el ID ${id}`);
      }
    } catch (error) {
      throw new Error(error.message || 'Error al validar la existencia de la opción');
    }
};

const validarPublicacionExistente = async (id) => {
    try {
      const query = 'SELECT 1 FROM foro WHERE ID = ? LIMIT 1';
      const params = [id]
      const formattedQuery = mysql.format(query, params);
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.length === 0) {
        throw new Error(`No se encontró una publicación con el ID ${id}`);
      }
    } catch (error) {
      throw new Error(error.message || 'Error al validar la existencia de la publicación');
    }
};

const validarPreguntaExistente = async (id) => {
    try {
      const query = 'SELECT 1 FROM preguntas WHERE ID = ? LIMIT 1';
      const params = [id]
      const formattedQuery = mysql.format(query, params);
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.length === 0) {
        throw new Error(`No se encontró una pregunta con el ID ${id}`);
      }
    } catch (error) {
      throw new Error(error.message || 'Error al validar la existencia de la pregunta');
    }
};
  


  
module.exports = { 
    validarEventoExistente,
    validarExpertoExistente,
    validarOpcionExistente,
    validarNotificacionExistente,
    validarPublicacionExistente,
    validarPreguntaExistente,
    validarPublicacionExistente
};