import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Home, Login, RequestResetPassword, ResetPassword, SignUp } from '../pages';
import LayoutAuth from '../shared/layouts/LayoutAuth';
import ProtectedRoutes from './ProtectedRoutes';
import NoAuthRoutes from './NoAuthRoutes';
import { UserLoader } from '../shared/loaders';


const router = createBrowserRouter([
    {
        element: <NoAuthRoutes />,
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
                path: '/reset-password/',
                element: <ResetPassword />
            },
            {
                path: '*',
                element: <Navigate to="/login" replace />
            }
        ]
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                element: <LayoutAuth />,
                loader: UserLoader,
                children: [
                    {
                        path: '/',
                        element: <Home />
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
            }
        ]
    },
]);


export default router;