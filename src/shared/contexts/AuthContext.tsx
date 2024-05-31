import React, { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, logout } from '../services/api/authService/AuthService';
import { getMe } from '../services/api/userService/UserService';

interface Project {
    id: number;
    name_project: string;
}

interface User {
    id: number;
    email: string;
    username: string;
    projects: Project[];
}

interface AuthContextType {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const navigate = useNavigate();

    

    async function handleLogin(username: string, password: string) {
        try {
            await login({ username: username, password: password });
            try {
                const user = await getMe();
                setUser(user);
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleLogout() {
        try {
            await logout();
            setUser(undefined);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            user, setUser,
            login: handleLogin,
            logout: handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};