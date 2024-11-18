const { ejecutarConsulta } = require('../database/config'); // Importa tu configuración de conexión a la base de datos
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
const obtenerExpertosPaginado = async (req, res) => {
    let { page, limit } = req.query;  // Recibe los parámetros de paginación
    page = parseInt(page, 10);  // Convierte a número
    limit = parseInt(limit, 10);  // Convierte a número
    
    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({ message: 'Parámetros de paginación inválidos' });
    }

    const offset = (page - 1) * limit;  // Calcula el desplazamiento para la consulta

    try {
        // Consulta SQL para obtener los expertos paginados
        const query = `
            SELECT 
                ID AS expertId,  
                CONCAT(First_Name, " ", Last_Name) AS nombre, 
                descripcion AS texto 
            FROM experto
            ORDER BY ID DESC
            LIMIT ${limit} OFFSET ${offset}
        `;
        
        const expertos = await ejecutarConsulta(query);

        // Comprobación de los expertos obtenidos
        console.log("Expertos obtenidos:", expertos);  // Ver los datos de los expertos

        // Obtener el total de expertos para calcular el número de páginas
        const totalExpertosQuery = 'SELECT COUNT(*) AS total FROM experto';
        const totalExpertosResult = await ejecutarConsulta(totalExpertosQuery);
        const totalPages = Math.ceil(totalExpertosResult[0].total / limit);

        res.json({
            expertos,
            totalPages
        });
    } catch (error) {
        console.error("Error al obtener expertos paginados:", error);
        res.status(500).json({ message: 'Error al obtener expertos' });
    }
};
const obtenerDetallesExperto = async (req, res) => {
    const expertId = req.params.id; // Obtener el ID del experto desde los parámetros de la URL
    
    console.log('ID del experto recibido:', expertId);  // Verifica que el id esté llegando correctamente

    if (!expertId) {
        return res.status(400).json({ message: "ID del experto no válido" });
    }

    try {
        const query = `
            SELECT 
                First_Name AS nombre,
                Last_Name AS apellido,
                Telefono,
                Email,
                Genero,
                Ocupación,
                descripcion,
                ID,
                Fecha_Nacimiento,
                Direccion,
                Certificaciones,
                Modalidad_Atencion,
                About_Me
            FROM experto
            WHERE ID = ?  
        `;
        const values = [expertId];  // Asegúrate de pasar el valor de expertId
        const formattedQuery = mysql.format(query, values);
        const result = await ejecutarConsulta(formattedQuery);

        if (result.length === 0) {
            return res.status(404).json({ message: "Experto no encontrado" });
        }

        res.json(result[0]); // Retornar los detalles del experto
    } catch (error) {
        console.error("Error al obtener detalles del experto:", error);
        res.status(500).json({ message: "Error al obtener detalles del experto" });
    }
};

module.exports = {
    obtenerExpertos,obtenerDetallesExperto,obtenerExpertosPaginado
};