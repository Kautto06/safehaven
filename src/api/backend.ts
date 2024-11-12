import axios from 'axios'
import { getenv } from '../helpers/getenv'

const { VITE_API_URL } = getenv();


const pageApi = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export default pageApi;