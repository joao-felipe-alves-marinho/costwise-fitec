import axios, { AxiosError } from 'axios';
import { isAuthenticated, refresh } from './authService/AuthService';

export const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api/v1',
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
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }
        refresh({
            access_token: localStorage.getItem('access_token')!,
            refresh_token: localStorage.getItem('refresh_token')!
        }).then((response) => {
            if (response) {
                if (error.config) return Api.request(error.config);
            }
        }).catch(() => {
            console.error('Erro refresh token.');
            return Promise.reject(error);
        });
    });
