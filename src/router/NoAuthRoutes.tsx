import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../shared/services/api/authService/AuthService';

export default function NoAuthRoutes() {
    if (isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}