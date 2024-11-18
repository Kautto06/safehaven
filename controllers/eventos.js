const mysql = require('mysql'); 
const { ejecutarConsulta } = require('../database/config'); // Función de ayuda para ejecutar consultas

// Obtener todos los eventos
const getEventos = async (req, res) => {
  try {
    const query = 'SELECT * FROM eventos';
    const result = await ejecutarConsulta(query);

    if (!result.length) {
      return res.status(404).json({ message: "No hay eventos registrados" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ message: "Error al obtener eventos" });
  }
};

// Crear un nuevo evento
const crearEvento = async (req, res) => {
  const { Titulo_Evento, Tipo, Fecha, Horario } = req.body;

  try {
    const query = `
      INSERT INTO eventos (Titulo_Evento, Tipo, Fecha, Horario)
      VALUES (?, ?, ?, ?)
    `;
    const values = [Titulo_Evento, Tipo, Fecha, Horario];
    const formattedQuery = mysql.format(query, values);

    const result = await ejecutarConsulta(formattedQuery);

    res.status(201).json({
      message: "Evento creado exitosamente",
      eventoId: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).json({ message: "Error al crear evento" });
  }
};

// Actualizar un evento existente
const actualizarEvento = async (req, res) => {
  const { id } = req.params;
  const { Titulo_Evento, Tipo, Fecha, Horario } = req.body;

  try {
    const query = `
      UPDATE eventos
      SET
        Titulo_Evento = COALESCE(?, Titulo_Evento),
        Tipo = COALESCE(?, Tipo),
        Fecha = COALESCE(?, Fecha),
        Horario = COALESCE(?, Horario)
      WHERE ID = ?
    `;
    const values = [Titulo_Evento, Tipo, Fecha, Horario, id];
    const formattedQuery = mysql.format(query, values);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json({ message: "Evento actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ message: "Error al actualizar evento" });
  }
};

// Eliminar un evento
const eliminarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM eventos WHERE ID = ?';
    const formattedQuery = mysql.format(query, [id]);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json({ message: "Evento eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ message: "Error al eliminar evento" });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
