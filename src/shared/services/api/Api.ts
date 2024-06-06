import axios, { AxiosError } from 'axios';
import { isAuthenticated, refresh } from './authService/AuthService';

export const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
});

Api.interceptors.request.use((config) => {
    if (isAuthenticated()) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
});

Api.interceptors.response.use(
    function (response) { return response; },
    async function (error: AxiosError) {
        if (error.response?.status !== 401 || error.config?.url === '/tokens') {
            return Promise.reject(error);
        }
        refresh({
            access_token: localStorage.getItem('access_token') ?? '',
            refresh_token: localStorage.getItem('refresh_token') ?? ''
        }).then(() => {
            if (error.config) return Api.request(error.config);
        }).catch(() => {
            console.error('Erro refresh token.');
        });
    });
