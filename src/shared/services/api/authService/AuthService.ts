import axios from 'axios';
import { Api } from '../Api';

interface RefreshData {
    access_token: string;
    refresh_token: string;
}

interface LoginData {
    username: string;
    password: string;
}

interface RequestResetPasswordData {
    email: string;
}

interface ResetPasswordData {
    token: string;
    new_password: string;
}

interface Response {
    status: number;
    data: {
        access_token: string;
        refresh_token: string;
    };
}

function getAccessToken() {
    return localStorage.getItem('access_token');
}

function setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
}

function setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
}

export async function refresh(data: RefreshData) {
    await axios.put(`${import.meta.env.VITE_API_URL}/tokens`, data)
        .then((response: Response) => {
            if (response.status === 200) {
                setAccessToken(response.data.access_token);
                Api.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
            }
        }).catch((error) => {
            console.error(error);
        });
}

export async function login(data: LoginData) {
    await Api.post('/tokens', {}, { auth: data })
        .then((response: Response) => {
            if (response.status === 200) {
                setAccessToken(response.data.access_token);
                setRefreshToken(response.data.refresh_token);
                Api.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
            }
        });
}

export async function logout() {
    await Api.delete('/tokens')
        .then((response) => {
            if (response.status === 204) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                delete Api.defaults.headers.Authorization;
            }
        });
}

export async function requestResetPassword(data: RequestResetPasswordData) {
    await Api.post('/tokens/reset', data);
}

export async function resetPassword(data: ResetPasswordData) {
    await Api.put('/tokens/reset', data);
}

export function isAuthenticated() {
    return getAccessToken() !== null;
}