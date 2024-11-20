const { ejecutarConsulta } = require('../database/config');
const mysql = require('mysql');

const guardarAccion = async (idUsuario, tipoAccion, descripcion, id_objeto) => {
    const userId = idUsuario; 
    const tipo_accion = tipoAccion;
    const Descripcion = descripcion;
    const objeto_id = id_objeto;

    const query = `
      INSERT INTO historial_acciones (id_usuario, tipo_accion, descripcion, id_objeto)
      VALUES (?, ?, ?, ?)
    `;
    const values = [userId, tipo_accion, Descripcion, objeto_id];
    const formattedQuery = mysql.format(query, values);
    try {
      await ejecutarConsulta(formattedQuery);
    } catch (error) {
      console.error("Error al guardar la acción en el historial:", error);
      throw error;
    }
};
const leerAcciones = async (req, res) => {
  const { email } = req.params; // Obtener el email del parámetro de la URL
  const { page = 1, pageSize = 10 } = req.query; // Obtener la página y el tamaño de página desde los query params, por defecto page=1 y pageSize=10

  if (!email) {
    return res.status(400).json({ message: 'Se necesita el email del usuario' });
  }

  // Calcular el offset basado en la página y el tamaño de página
  const offset = (page - 1) * pageSize;

  // Consulta para obtener las acciones paginadas
  const query = `
    SELECT * FROM historial_acciones
    WHERE id_usuario = ?
    ORDER BY ID DESC
    LIMIT ? OFFSET ?;
  `;
  
  const values = [email, parseInt(pageSize), parseInt(offset)];
  const formattedQuery = mysql.format(query, values);

  // Consulta para obtener el total de acciones
  const countQuery = `
    SELECT COUNT(*) AS totalCount
    FROM historial_acciones
    WHERE id_usuario = ?
  `;
  
  const countValues = [email];
  const formattedCountQuery = mysql.format(countQuery, countValues);

  try {
    const [result, countResult] = await Promise.all([
      ejecutarConsulta(formattedQuery),    // Consulta de las acciones paginadas
      ejecutarConsulta(formattedCountQuery) // Consulta para contar el total de acciones
    ]);

    const totalCount = countResult[0].totalCount;  // Número total de acciones
    const totalPages = Math.ceil(totalCount / pageSize);  // Total de páginas

    res.json({
      acciones: result,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
      totalPages
    });
  } catch (error) {
    console.error("Error al leer las acciones del historial:", error);
    res.status(500).json({ message: 'Error al obtener las acciones' });
  }
};


module.exports = { guardarAccion,leerAcciones };
