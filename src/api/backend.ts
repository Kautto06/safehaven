import axios from 'axios'
import { getenv } from '../helpers/common/getenv'

const { VITE_API_URL } = getenv();


const pageApi = axios.create({
    baseURL: 'http://localhost:8000/api',
});

pageApi.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.set('x-token', token); // Usa el método 'set' para asignar el encabezado
    }
    return config;
})

export default pageApi;