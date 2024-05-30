import { Api } from '../Api';

interface CreateUserDato {
    email: string;
    username: string;
    password: string;
}

interface UpdateUserDato {
    email?: string;
    username?: string;
    password?: string;
}

interface User {
    id: number;
    email: string;
    username: string;
}

interface Project {
    id: string;
    name_project: string;

}

interface UserResponse extends User {
    projects: Project[];
}


export async function getUsers(): Promise<User[] | undefined> {
    try {
        const response = await Api.get('/users');
        if (response.status === 200) {
            return response.data as User[];
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getUser(id: string): Promise<UserResponse | undefined>{
    try {
        const response = await Api.get(`/users/${id}`);
        if (response.status === 200) {
            return response.data as UserResponse;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function createUser(data: CreateUserDato): Promise<UserResponse | undefined>{
    try {
        const response = await Api.post('/users', data);
        if (response.status === 201) {
            return response.data as UserResponse;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(data: UpdateUserDato): Promise<UserResponse | undefined>{
    try {
        const response = await Api.put('/users', data);
        if (response.status === 200) {
            return response.data as UserResponse;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(): Promise<boolean>{
    try {
        const response = await Api.delete('/users');
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}