import pageApi from "../../../api/backend";

interface Denuncia {
    ID: number;
    TipoViolencia: string;
    UbicacionIncidente: string;
    Contenido: string;
    RelacionAgresor: string;
    estado: string; // Puede ser "Pendiente", "En Proceso" o "Resuelta"
    LinkImagen?: string
    ID_USUARIO: string; // Agregado el campo ID_USUARIO
  }

export const crearDenuncia = async (denuncia: Omit<Denuncia, 'ID' | 'Fecha' | 'Estado'>)=> {
    try {
      const { data } = await pageApi.post<Denuncia>('/denuncias/crear', denuncia);
      return data; // Regresa la respuesta del servidor después de crear la denuncia
    } catch (error) {
      console.error('Error al crear la denuncia:', error);
      throw error;
    }
  };

  export const actualizarImagenDenuncia = async (id: number, archivo: File) => {
    const formData = new FormData();
    formData.append('imagen', archivo); // Adjuntamos la nueva imagen
  
    try {
      const { data } = await pageApi.put(`/uploads/denuncia/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necesario para enviar FormData
        },
      });
      return data; // Retornamos la respuesta con la URL de la nueva imagen
    } catch (error) {
      console.error('Error al actualizar la imagen de la denuncia:', error);
      throw error;
    }
  };