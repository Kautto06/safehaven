import pageApi from "../../../api/backend";

export const getOpciones = async () => {
    try {
      const response = await pageApi.get(`/opciones/`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las opciones:", error);
      throw error;
    }
  };

export const getPreguntas = async () => {
    try {
      const response = await pageApi.get(`/preguntas`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
      throw error;
    }
  };
  
  // Función para agregar una nueva pregunta
  export const agregarPregunta = async (pregunta: string) => {
    try {
      const response = await pageApi.post(`/preguntas/crear`, { pregunta });
      return response.data;
    } catch (error) {
      console.error("Error al agregar la pregunta:", error);
      throw error;
    }
  };
  
  // Función para eliminar una pregunta
  export const eliminarPregunta = async (preguntaId: number) => {
    try {
      await pageApi.delete(`/opciones/eliminarPorPregunta/${preguntaId}`);
      await pageApi.delete(`/preguntas/eliminar/${preguntaId}`);
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error);
      throw error;
    }
  };
  
  // Función para modificar una pregunta
  export const modificarPregunta = async (preguntaId: number, nuevaPregunta: string) => {
    try {
      const response = await pageApi.put(`/preguntas/actualizar/${preguntaId}`, { pregunta: nuevaPregunta });
      return response.data;
    } catch (error) {
      console.error("Error al modificar la pregunta:", error);
      throw error;
    }
  };
  
  
  export const agregarOpcion = async (preguntaId: number, opcion: string) => {
    try {
      const response = await pageApi.post(`/opciones/crear`, { opcion: opcion,PreguntaID: preguntaId });
      return response.data;
    } catch (error) {
      console.error("Error al agregar la opción:", error);
      throw error;
    }
  };

  export const getOpcionPorId = async (opcionId: number) => {
    try {
      const response = await pageApi.get(`/opciones/${opcionId}`);
      return response.data;
    } catch (error) {
      console.error("Error al agregar la opción:", error);
      throw error;
    }
  };

  export const getPreguntaPorId = async (preguntaId: number) => {
    try {
      const response = await pageApi.get(`/preguntas/obtenerPorId/${preguntaId}`);
      return response.data;
    } catch (error) {
      console.error("Error al agregar la opción:", error);
      throw error;
    }
  };
  
  // Función para eliminar una opción
  export const eliminarOpcion = async (preguntaId: number, opcionId: number) => {
    try {
      await pageApi.delete(`/opciones/eliminar/${opcionId}`);
    } catch (error) {
      console.error("Error al eliminar la opción:", error);
      throw error;
    }
  };
  
  // Función para modificar una opción
  export const modificarOpcion = async (preguntaId: number, opcionId: number, nuevaOpcion: string) => {
    try {
      const response = await pageApi.put(`/opciones/actualizar/${opcionId}`, { opcion: nuevaOpcion });
      return response.data;
    } catch (error) {
      console.error("Error al modificar la opción:", error);
      throw error;
    }
  };