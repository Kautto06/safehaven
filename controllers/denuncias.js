const mysql = require('mysql');  // Asegúrate de usar mysql2/promise para trabajar con async/await.
const { ejecutarConsulta } = require('../database/config'); // Función para ejecutar consultas a la base de datos.

const obtenerDenuncias = async (req, res) => {
  try {
    const query = 'SELECT * FROM denuncias';
    const result = await ejecutarConsulta(query);

    if (!result.length) {
      return res.status(404).json({ message: "No hay denuncias registradas" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error al obtener denuncias:", error);
    res.status(500).json({ message: "Error al obtener denuncias" });
  }
};

const crearDenuncia = async (req, res) => {
  const { TipoViolencia, UbicacionIncidente, Contenido, RelacionAgresor } = req.body;

  try {
    const query = `
      INSERT INTO denuncias (TipoViolencia, UbicacionIncidente, Contenido, RelacionAgresor, FechaCreacion)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const values = [TipoViolencia, UbicacionIncidente, Contenido, RelacionAgresor];
    const formattedQuery = mysql.format(query, values);

    const result = await ejecutarConsulta(formattedQuery);

    res.status(201).json({
      message: "Denuncia creada exitosamente",
      denunciaId: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear denuncia:", error);
    res.status(500).json({ message: "Error al crear denuncia" });
  }
};

const actualizarDenuncia = async (req, res) => {
  const { id } = req.params;
  const { TipoViolencia, UbicacionIncidente, Contenido, RelacionAgresor } = req.body;

  try {
    const query = `
      UPDATE denuncias
      SET
        TipoViolencia = COALESCE(?, TipoViolencia),
        UbicacionIncidente = COALESCE(?, UbicacionIncidente),
        Contenido = COALESCE(?, Contenido),
        RelacionAgresor = COALESCE(?, RelacionAgresor),
        FechaActualizacion = NOW()
      WHERE ID = ?
    `;
    const values = [TipoViolencia, UbicacionIncidente, Contenido, RelacionAgresor, id];
    const formattedQuery = mysql.format(query, values);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Denuncia no encontrada" });
    }

    res.json({ message: "Denuncia actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar denuncia:", error);
    res.status(500).json({ message: "Error al actualizar denuncia" });
  }
};

const eliminarDenuncia = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM denuncias WHERE ID = ?';
    const formattedQuery = mysql.format(query, [id]);

    const result = await ejecutarConsulta(formattedQuery);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Denuncia no encontrada" });
    }

    res.json({ message: "Denuncia eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar denuncia:", error);
    res.status(500).json({ message: "Error al eliminar denuncia" });
  }
};

module.exports = {
  obtenerDenuncias,
  crearDenuncia,
  actualizarDenuncia,
  eliminarDenuncia,
};


