const { ejecutarConsulta } = require('../database/config');
const mysql = require('mysql'); 

// Controlador para obtener todos los expertos
const obtenerExpertos = async (req, res) => {
    try {
        const query = `
            SELECT 
                CONCAT(First_Name, " ", Last_Name) AS nombre, 
                descripcion AS texto 
            FROM experto
            ORDER BY ID DESC
            LIMIT 5
        `;
        const resultados = await ejecutarConsulta(query);
        res.json(resultados);
    } catch (error) {
        console.error("Error al obtener expertos:", error);
        res.status(500).json({ message: 'Error al obtener expertos' });
    }
};

const obtenerExpertoPorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = 'SELECT * FROM expertos WHERE ID = ?';
      const values = [id];
      const formattedQuery = mysql.format(query, values);
  
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.length === 0) {
        return res.status(404).json({ message: "Experto no encontrado" });
      }
  
      res.json(result[0]); // Retornar el experto encontrado
    } catch (error) {
      console.error("Error al obtener experto por ID:", error);
      res.status(500).json({ message: "Error al obtener experto" });
    }
  };
  
  // Crear un nuevo experto
  const crearExperto = async (req, res) => {
    const { First_Name, Last_Name, Telefono, Email, Genero, Ocupación, Modalidad_Atencion } = req.body;
  
    try {
      const query = `
        INSERT INTO expertos (First_Name, Last_Name, Telefono, Email, Genero, Ocupación, Modalidad_Atencion)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [First_Name, Last_Name, Telefono, Email, Genero, Ocupación, Modalidad_Atencion];
      const formattedQuery = mysql.format(query, values);
  
      const result = await ejecutarConsulta(formattedQuery);
  
      res.status(201).json({
        message: "Experto creado exitosamente",
        expertoId: result.insertId,
      });
    } catch (error) {
      console.error("Error al crear experto:", error);
      res.status(500).json({ message: "Error al crear experto" });
    }
  };
  
  // Actualizar un experto existente
  const actualizarExperto = async (req, res) => {
    const { id } = req.params;
    const { First_Name, Last_Name, Telefono, Email, Genero, Ocupación, Modalidad_Atencion } = req.body;
  
    try {
      const query = `
        UPDATE expertos
        SET
          First_Name = COALESCE(?, First_Name),
          Last_Name = COALESCE(?, Last_Name),
          Telefono = COALESCE(?, Telefono),
          Email = COALESCE(?, Email),
          Genero = COALESCE(?, Genero),
          Ocupación = COALESCE(?, Ocupación),
          Modalidad_Atencion = COALESCE(?, Modalidad_Atencion)
        WHERE ID = ?
      `;
      const values = [First_Name, Last_Name, Telefono, Email, Genero, Ocupación, Modalidad_Atencion, id];
      const formattedQuery = mysql.format(query, values);
  
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Experto no encontrado" });
      }
  
      res.json({ message: "Experto actualizado exitosamente" });
    } catch (error) {
      console.error("Error al actualizar experto:", error);
      res.status(500).json({ message: "Error al actualizar experto" });
    }
  };
  
  // Eliminar un experto
  const eliminarExperto = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = 'DELETE FROM expertos WHERE ID = ?';
      const formattedQuery = mysql.format(query, [id]);
  
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Experto no encontrado" });
      }
  
      res.json({ message: "Experto eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar experto:", error);
      res.status(500).json({ message: "Error al eliminar experto" });
    }
  };
  
  module.exports = {
    obtenerExpertos,
    obtenerExpertoPorId,
    crearExperto,
    actualizarExperto,
    eliminarExperto,
  };