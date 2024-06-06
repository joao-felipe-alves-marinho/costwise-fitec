import axios, { AxiosError } from 'axios';
import { refresh } from './authService/AuthService';

export const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
});

Api.interceptors.response.use(
    function (response) { return response; },
    async function (error: AxiosError) {
        if (error.status !== 401 || error.config?.url === '/tokens') {
            if (error.config?.url === `${import.meta.env.VITE_API_URL}/tokens`) {
                return Promise.reject(error);
            }
        }
        await refresh({
            access_token: localStorage.getItem('access_token') ?? '',
            refresh_token: localStorage.getItem('refresh_token') ?? ''
        });
    });
