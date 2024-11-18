const { ejecutarConsulta } = require('../database/config'); // Importa tu configuración de conexión a la base de datos
const mysql = require('mysql');

// Controlador para obtener todos los expertos
const obtenerForoHome = async (req, res) => {
    try {
        const query = `
            SELECT 
                ID,
                Titulo AS Titulo, 
                LEFT(Contenido, 100) AS texto_preview  -- Limita el contenido a los primeros 100 caracteres
            FROM publicación
            ORDER BY ID DESC
            LIMIT 5
        `;
        console.log("Ejecutando consulta:", query); // Imprime la consulta para verificar
        const resultados = await ejecutarConsulta(query);
        res.json(resultados);
    } catch (error) {
        console.error("Error al obtener expertos:", error);
        res.status(500).json({ message: 'Error al obtener expertos' });
    }
};
const obtenerForoPaginado = async (req, res) => {
    const { page = 1, limit = 5, orden = 'fecha' } = req.query;  // Orden por defecto es 'fecha'

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || isNaN(limitNum)) {
        return res.status(400).json({ message: 'Page y Limit deben ser números válidos' });
    }

    const offset = (pageNum - 1) * limitNum;

    try {
        let query;
        if (orden === 'popular') {
            query = `
                SELECT 
                    p.ID,  -- Añadido el campo ID
                    p.Titulo AS Titulo, 
                    LEFT(p.Contenido, 100) AS texto_preview, 
                    p.Likes, 
                    CONCAT(u.nombre, ' ', u.apellidos) AS autor
                FROM publicación p
                JOIN usuarios u ON p.ID_Usuario = u.email
                ORDER BY p.Likes DESC
                LIMIT ${limitNum} OFFSET ${offset}
            `;
        } else {
            query = `
                SELECT 
                    p.ID,  -- Añadido el campo ID
                    p.Titulo AS Titulo, 
                    LEFT(p.Contenido, 100) AS texto_preview, 
                    p.Likes, 
                    u.nombre AS autor
                FROM publicación p
                JOIN usuarios u ON p.ID_Usuario = u.email
                ORDER BY p.ID DESC
                LIMIT ${limitNum} OFFSET ${offset}
            `;
        }

        const publicaciones = await ejecutarConsulta(query);

        const totalQuery = 'SELECT COUNT(*) AS total FROM publicación';
        const totalResult = await ejecutarConsulta(totalQuery);
        const total = totalResult[0].total;
        const totalPages = Math.ceil(total / limitNum);

        res.json({
            publicaciones,
            totalPages,
            currentPage: pageNum,
            totalPosts: total,
        });
    } catch (error) {
        console.error("Error al obtener publicaciones del foro:", error);
        res.status(500).json({ message: 'Error al obtener publicaciones del foro' });
    }
};

const obtenerDetallesPost = async (req, res) => {
    const postId = req.params.id; // Obtener el ID del post desde los parámetros de la URL
    try {
      const query = `
        SELECT 
          p.Titulo AS Titulo,
          p.Contenido AS Contenido,
          p.Likes,
          CONCAT(u.nombre, ' ', u.apellidos) AS autor
        FROM publicación p
        JOIN usuarios u ON p.ID_Usuario = u.email
        WHERE p.ID = ?
      `;

      const values = [postId];

    // Formatea la consulta para evitar problemas con los parámetros
      const formattedQuery = mysql.format(query, values);
      const result = await ejecutarConsulta(formattedQuery);

      // Agregar un console.log para ver lo que devuelve la consulta
      console.log(result); // Verifica el resultado de la consulta

      if (result.length === 0) {
        return res.status(404).json({ message: "Post no encontrado" });
      }

      res.json(result[0]); // Retornar los detalles del post
    } catch (error) {
      console.error("Error al obtener detalles del post:", error);
      res.status(500).json({ message: "Error al obtener detalles del post" });
    }
  };

  const crearForo = async (req, res) => {
    const { Contenido, Titulo, ID_Usuario } = req.body;
  
    try {
      const query = `
        INSERT INTO foro (Contenido, Titulo, ID_Usuario, Fecha_Publicacion)
        VALUES (?, ?, ?, NOW())
      `;
      const values = [Contenido, Titulo, ID_Usuario];
      const formattedQuery = mysql.format(query, values);
  
      const result = await ejecutarConsulta(formattedQuery);
  
      res.status(201).json({
        message: "Publicación creada exitosamente",
        publicacionId: result.insertId,
      });
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      res.status(500).json({ message: "Error al crear la publicación" });
    }
  };
  
  // Eliminar una publicación
  const eliminarForo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = 'DELETE FROM foro WHERE ID = ?';
      const formattedQuery = mysql.format(query, [id]);
  
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
  
      res.json({ message: "Publicación eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      res.status(500).json({ message: "Error al eliminar la publicación" });
    }
  };
  
  // Actualizar una publicación existente
  const actualizarForo = async (req, res) => {
    const { id } = req.params;
    const { Contenido, Titulo, ID_Usuario } = req.body;
  
    try {
      const query = `
        UPDATE foro
        SET
          Contenido = COALESCE(?, Contenido),
          Titulo = COALESCE(?, Titulo),
          ID_Usuario = COALESCE(?, ID_Usuario),
          Fecha_Actualizacion = NOW()
        WHERE ID = ?
      `;
      const values = [Contenido, Titulo, ID_Usuario, id];
      const formattedQuery = mysql.format(query, values);
  
      const result = await ejecutarConsulta(formattedQuery);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
  
      res.json({ message: "Publicación actualizada exitosamente" });
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      res.status(500).json({ message: "Error al actualizar la publicación" });
    }
  };


module.exports = {
    obtenerForoHome,obtenerForoPaginado,obtenerDetallesPost,crearForo,actualizarForo,eliminarForo
};