
import pageApi from '../../../api/backend';

interface Denuncia {
  ID: number;
  TipoViolencia: string;
  UbicacionIncidente: string;
  Contenido: string;
  RelacionAgresor: string; // Relación con el agresor
  estado: string; // Puede ser "Pendiente", "En Proceso" o "Resuelta"
  ID_USUARIO: string; // ID del usuario relacionado
  LinkImagen?: string; // URL de la imagen (puede ser opcional si no hay imagen)
}

// Obtener todas las denuncias
export const obtenerDenuncias = async (): Promise<Denuncia[]> => {
  try {
    const { data } = await pageApi.get<Denuncia[]>('/denuncias');
    return data; // Regresa las denuncias obtenidas desde el servidor
  } catch (error) {
    console.error('Error al obtener las denuncias:', error);
    throw error;
  }
};

// Crear una denuncia
export const crearDenuncia = async (denuncia: Omit<Denuncia, 'ID' | 'Fecha' | 'Estado'>): Promise<Denuncia> => {
  try {
    const { data } = await pageApi.post<Denuncia>('/denuncias/crear', denuncia);
    return data; // Regresa la respuesta del servidor después de crear la denuncia
  } catch (error) {
    console.error('Error al crear la denuncia:', error);
    throw error;
  }
};

// Actualizar una denuncia
export const actualizarDenuncia = async (id: number, denuncia: Partial<Denuncia>): Promise<Denuncia> => {
  try {
    const { data } = await pageApi.put<Denuncia>(`/denuncias/actualizar/${id}`, denuncia);
    return data; // Regresa la respuesta del servidor después de actualizar
  } catch (error) {
    console.error('Error al actualizar la denuncia:', error);
    throw error;
  }
};

export const actualizarEstadoDenuncia = async (id: number, estado: string): Promise<Denuncia> => {
  try {
    const { data } = await pageApi.put<Denuncia>(`/denuncias/actualizarestado/${id}`, { estado });
    return data; // Regresa la respuesta del servidor después de actualizar
  } catch (error) {
    console.error('Error al actualizar el estado de la ruta:', error);
    throw error;
  }
};



// Eliminar una denuncia
export const eliminarDenuncia = async (id: number): Promise<{ message: string }> => {
  try {
    const { data } = await pageApi.delete<{ message: string }>(`/denuncias/eliminar/${id}`);
    return data; // Regresa la respuesta del servidor después de eliminar
  } catch (error) {
    console.error('Error al eliminar la denuncia:', error);
    throw error;
  }
}