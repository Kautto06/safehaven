const { ejecutarConsulta } = require('../database/config'); // Importa tu configuración de conexión a la base de datos

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
        WHERE p.ID = ${postId}  
      `;
      const result = await ejecutarConsulta(query, [postId]);

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

  const manejarLikeIncrement = async (req, res) => {
    const postId = req.params.id;
    try {
      const queryUpdate = `
        UPDATE publicación
        SET Likes = Likes + 1
        WHERE ID = ${postId}
      `;
      await ejecutarConsulta(queryUpdate);  // Ejecuta la consulta para incrementar
  
      // Recupera el número actualizado de likes
      const querySelect = `SELECT Likes FROM publicación WHERE ID = ${postId}`;
      const result = await ejecutarConsulta(querySelect);
  
      if (result.length === 0) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
  
      res.json({ Likes: result[0].Likes });  // Retorna el número actualizado de likes
    } catch (error) {
      console.error("Error al incrementar los likes:", error);
      res.status(500).json({ message: "Error al incrementar los likes" });
    }
  };
  
  // Función para disminuir el like
  const manejarLikeDecrement = async (req, res) => {
    const postId = req.params.id;
    try {
      const queryUpdate = `
        UPDATE publicación
        SET Likes = Likes - 1
        WHERE ID = ${postId}
      `;
      await ejecutarConsulta(queryUpdate);  // Ejecuta la consulta para decrementar
  
      // Recupera el número actualizado de likes
      const querySelect = `SELECT Likes FROM publicación WHERE ID = ${postId}`;
      const result = await ejecutarConsulta(querySelect);
  
      if (result.length === 0) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
  
      res.json({ Likes: result[0].Likes });  // Retorna el número actualizado de likes
    } catch (error) {
      console.error("Error al disminuir los likes:", error);
      res.status(500).json({ message: "Error al disminuir los likes" });
    }
  };
  
module.exports = {
    obtenerForoHome,obtenerForoPaginado,obtenerDetallesPost,manejarLikeIncrement,manejarLikeDecrement,
};