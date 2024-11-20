import pageApi from "../../../api/backend";

interface Publicacion {
    ID: number;            // ID de la publicación
    Titulo: string;        // Título de la publicación // Previsualización del contenido (solo los primeros 100 caracteres)
    Likes: number;         // Número de "me gusta"
    ID_Usuario: string;         // Nombre completo del autor (usando el formato nombre + apellidos)
    Contenido: string;    // Contenido completo de la publicación (opcional, para obtener detalles completos)
    img_public?: string;   // URL de la imagen asociada (opcional)
  }


// Obtener publicaciones con paginación
export const obtenerAllPublicaciones = async ()  => {
  try {
    const response = await pageApi.get(`/foro/all`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener publicaciones ', error);
    throw new Error('No se pudo obtener las publicaciones');
  }
};

// Obtener los detalles de una publicación específica
export const obtenerDetallesPost = async (id: number) => {
  try {
    const response = await pageApi.get(`/foro/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la publicación:', error);
    throw new Error('No se pudo obtener los detalles de la publicación');
  }
};

// Crear una nueva publicación

// Eliminar una publicación
export const eliminarForo = async (id: number) => {
  try {
    await pageApi.delete(`/foro/eliminar/${id}`);
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    throw new Error('No se pudo eliminar la publicación');
  }
};

// Actualizar una publicación existente