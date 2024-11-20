import pageApi from "../../../api/backend";

 // Asegúrate de tener la configuración de axios exportada desde este archivo

interface Evento {
    ID: number;
    Titulo_Evento: string;
    Tipo: string;
    Fecha: string; // Se puede manejar como string para ser procesado más fácilmente
    Horario: string; // Se puede manejar como string para ser procesado más fácilmente
  }
// Obtener todos los eventos
export const getEventos = async ()=> {
  try {
    const response = await pageApi.get('/eventos');
    return response.data; // axios devuelve la respuesta en `response.data`
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    throw error;
  }
};

export const getEventoId = async (id: number)=>{
    try {
        const response = await pageApi.get(`/eventos/${id}`);
        return response.data; // axios devuelve la respuesta en `response.data`
      } catch (error) {
        console.error('Error al obtener eventos:', error);
        throw error;
      }
}

// Crear un nuevo evento
export const crearEvento = async (evento: Omit<Evento, 'ID'>) => {
    try {
      const response = await pageApi.post('/eventos/crear', evento);
      return response.data; // axios devuelve la respuesta en `response.data`
    } catch (error) {
      console.error('Error al crear evento:', error);
      throw error;
    }
  };

// Actualizar un evento existente
export const actualizarEvento = async (id: number, evento: Omit<Evento, 'ID'>) => {
    try {
      const response = await pageApi.put(`/eventos/actualizar/${id}`, evento);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      throw error;
    }
};

// Eliminar un evento
export const eliminarEvento = async (id: number) => {
    try {
      await pageApi.delete(`/eventos/eliminar/${id}`);
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      throw error;
    }
};
