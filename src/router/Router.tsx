import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Login, RequestResetPassword, ResetPassword, SignUp } from '../pages';
import { AuthProvider } from '../shared/contexts';
import ProtectedRoutes from './ProtectedRoutes';


const router = createBrowserRouter([
    {
        element: <AuthProvider />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/recover-password',
                element: <RequestResetPassword />
            },
            {
                path: '/reset-password',
                element: <ResetPassword />
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '/',
                        element: <h1>dash</h1>
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
            }]
    },
]);

export default router;