import axios from 'axios';

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: 'Bearer {token}',
    }
})