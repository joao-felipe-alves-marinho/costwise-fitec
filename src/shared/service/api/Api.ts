import axios from 'axios';
import { refresh } from './authService/AuthService';

const Api = axios.create({
    baseURL: import.meta.env.VITE_Api_URL as string,
});

Api.interceptors.response.use(function (response) { return response; },
    async function (error: { response: { status: number } }) {
        if (error.response.status === 401) {
            await refresh({
                access_token: localStorage.getItem('access_token') ?? '',
                refresh_token: localStorage.getItem('refresh_token') ?? ''
            });
        }
    });


export { Api };