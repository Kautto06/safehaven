const { ejecutarConsulta } = require('../database/config'); // Importa tu configuración de conexión a la base de datos

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

module.exports = {
    obtenerExpertos,
};