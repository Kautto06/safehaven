import axios from 'axios'
import { getenv } from '../helpers/common/getenv'

const { VITE_API_URL } = getenv();


const pageApi = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export default pageApi;