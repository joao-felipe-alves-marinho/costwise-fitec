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
    reset_token: string;
    password: string;
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
    try {
        const response = await axios.put('/tokens', data);
        if (response.status === 200) {
            setAccessToken(response.data.access_token);
            Api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`;

        }
    } catch (error) {
        console.error(error);
    }
}

export async function login(data: LoginData) {
    try {
        const response = await Api.post('/tokens', {}, { auth: data });
        if (response.status === 200) {
            setAccessToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);
            Api.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`;
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        const response = await Api.delete('/tokens');
        if (response.status === 204) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            delete Api.defaults.headers['Authorization'];
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function requestResetPassword(data: RequestResetPasswordData) {
    try {
        const response = await Api.post('/password-reset', data);
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function resetPassword(data: ResetPasswordData) {
    try {
        const response = await Api.put('/password-reset', data);
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}