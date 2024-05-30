import { createBrowserRouter } from 'react-router-dom';

import App from '../App';


const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/login',
            },
            {
                path: '/signup',
            },
            {
                path: '/recover-password',
            },
            {
                path: '/reset-password',
            },
            {
                path: '/',
            },
            {
                path: '/project/:id',
            },
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
            {
                path: '/user/:id',
            }
        ]
    }
]);

export default router;