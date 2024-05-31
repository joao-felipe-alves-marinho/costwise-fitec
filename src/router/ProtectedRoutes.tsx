import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../shared/services/api/authService/AuthService';

export default function ProtectedRoutes() {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}