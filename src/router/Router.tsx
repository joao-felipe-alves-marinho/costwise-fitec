import { Navigate, createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { Login } from '../pages';


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
    },
    {
        path: '/recover-password',
    },
    {
        path: '/reset-password/:token',
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/',
            },
            {
                path: '/project/:id',
                children: [
                    {
                        path: '/project/:id/products',
                    },
                    {
                        path: '/project/:id/members',
                    },
                    {
                        path: '/project/:id/tasks',
                    },
                    {
                        path: '/project/:id/budget',
                    },
                ]
            },
            {
                path: '/user/:id',
            },
            {
                path: '*',
                element: <Navigate to="/" replace />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    }
]);

export default router;