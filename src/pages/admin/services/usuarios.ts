import pageApi from "../../../api/backend";

export const updateEstadoUser = async (estado: string, emailUser:string) => {
    try {
        const response = await pageApi.put('/user/updateEstado',{estado: estado, email: emailUser})
        return response.data
    } catch (error) {
        console.log("Error al actualizar el estado del usuario", error);
        throw error
    }
}

export const getAllUser = async() => {
    try {
        const response = await pageApi.get('/user/all')
        return response.data
    } catch (error) {
        console.log("Error al actualizar el estado del usuario", error);
        throw error
    }
}

