import pageApi from "../../../api/backend";
interface IExpert {
    ID: number;
    First_Name: string;
    Last_Name: string;
    Telefono: string;
    Email: string;
    Genero: string;
    Ocupación: string;
    descripcion: string;
    Fecha_Nacimiento: string;
    Direccion: string;
    Certificaciones: string;
    Modalidad_Atencion: string;
    About_Me: string;
    LinkImagen: string;
  }

// Función para obtener todos los expertos
export const getExpertos = async () => {
  try {
    const response = await pageApi.get(`/experts/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los expertos:", error);
    throw error;
  }
};

// Función para agregar un nuevo experto (ahora recibe un objeto Experto)
export const agregarExperto = async (experto: IExpert) => {
  try {
    const response = await pageApi.post(`/experts/crear`, experto);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el experto:", error);
    throw error;
  }
};

// Función para obtener un experto por su ID
export const getExpertoPorId = async (expertoId: number) => {
  try {
    const response = await pageApi.get(`/experts/${expertoId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el experto:", error);
    throw error;
  }
};

// Función para eliminar un experto
export const eliminarExperto = async (expertoId: number) => {
  try {
    await pageApi.delete(`/experts/eliminar/${expertoId}`);
  } catch (error) {
    console.error("Error al eliminar el experto:", error);
    throw error;
  }
};

// Función para modificar los datos de un experto (ahora recibe un objeto Experto y su ID)
export const modificarExperto = async (expertoId: number, experto: IExpert) => {
  try {
    const response = await pageApi.put(`/experts/actualizar/${expertoId}`, experto);
    return response.data;
  } catch (error) {
    console.error("Error al modificar el experto:", error);
    throw error;
  }
};

// Función para subir la imagen de un experto
export const subirImagenExperto = async (expertoId: number, archivo: File) => {
  const formData = new FormData();
  formData.append("imagen", archivo);

  try {
    const response = await pageApi.put(`/uploads/experto/${expertoId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data; // Devuelve la URL de la imagen o la respuesta del backend
  } catch (error) {
    console.error("Error al subir la imagen del experto:", error);
    throw error;
  }
};
