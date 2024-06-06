import { User } from '../../../types/Types';
import { Api } from '../Api';

type UserData = Omit<User, 'id' | 'projects' >;

export async function getUsers(): Promise<User[] | null> {
    return await Api.get('/users').then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as User[];
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function getUser(id: string): Promise<User | null> {
    return await Api.get(`/users/${id}`).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as User;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function getMe(): Promise<User | null> {
    return await Api.get('/users/me').then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as User;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function createUser(data: UserData): Promise<User | null> {
    return await Api.post('/users', data).then((response) => {
        if (response.status !== 201) {
            return null;
        }
        return response.data as User;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function updateUser(data: Partial<UserData>): Promise<User | null> {
    return await Api.put('/users', data).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        return response.data as User;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function deleteUser(): Promise<boolean> {
    return await Api.delete('/users')
        .then(() => { return true; })
        .catch((error) => {
            console.error(error);
            return false;
        });
}