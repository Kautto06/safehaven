import pageApi from "../../../api/backend";

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