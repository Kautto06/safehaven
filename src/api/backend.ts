import axios from 'axios'
import { getenv } from '../helpers/getenv'

const { VITE_API_URL } = getenv();


const pageApi = axios.create({
    baseURL: VITE_API_URL
})

export default pageApi;