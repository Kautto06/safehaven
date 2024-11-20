import pageApi from "../../../api/backend";

interface Notificacion {
    ID: number;
    Titulo: string;
    Contenido: string;
    Link?: string;
    Descripcion?: string | null;
  }

  const BASE_URL = '/notificaciones';

  const obtenerNotificacionesPaginadas = async (page: number, limit: number)=> {
    try {
      const response = await pageApi.get(`${BASE_URL}/paginado?page=${page}&limit=${limit}`);
      return response.data; // Asegúrate que la respuesta siga esta estructura
    } catch (error) {
      console.error("Error al obtener notificaciones paginadas", error);
      throw new Error('No se pudieron obtener las notificaciones');
    }
  };
  
  const obtenerTodasLasNotificaciones = async (): Promise<Notificacion[]> => {
    try {
      const response = await pageApi.get(BASE_URL);
      return response.data.notificaciones; // Ajusta según la respuesta del backend
    } catch (error) {
      console.error("Error al obtener todas las notificaciones", error);
      throw new Error('No se pudieron obtener las notificaciones');
    }
  };

  const obtenerNotificaionId = async ( id: number)=> {
    try {
      const response = await pageApi.get(`${BASE_URL}/${id}`);
      return response.data // Ajusta según la respuesta del backend
    } catch (error) {
      console.error("Error al obtener todas las notificaciones", error);
      throw new Error('No se pudieron obtener las notificaciones');
    }
  };
  
  const crearNotificacion = async (notificacion: Omit<Notificacion, 'notificationId'>)=> {
    try {
      const response = await pageApi.post(`${BASE_URL}/crear`, notificacion);
      return response.data; // Ajusta según el formato de respuesta
    } catch (error) {
      console.error("Error al crear la notificación", error);
      throw new Error('No se pudo crear la notificación');
    }
  };
  
  const actualizarNotificacion = async (id: number, notificacion: Partial<Notificacion>)=> {
    try {
      await pageApi.put(`${BASE_URL}/actualizar/${id}`, notificacion);
    } catch (error) {
      console.error("Error al actualizar la notificación", error);
      throw new Error('No se pudo actualizar la notificación');
    }
  };
  
  const eliminarNotificacion = async (id: number)=> {
    try {
      await pageApi.delete(`${BASE_URL}/eliminar/${id}`);
    } catch (error) {
      console.error("Error al eliminar la notificación", error);
      throw new Error('No se pudo eliminar la notificación');
    }
  };
  
  export const notificacionesApi = {
    obtenerNotificacionesPaginadas,
    obtenerTodasLasNotificaciones,
    crearNotificacion,
    actualizarNotificacion,
    eliminarNotificacion,
    obtenerNotificaionId
  };