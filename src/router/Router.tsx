import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Home, Login, ProjectBudget, ProjectIndex, ProjectPage, ProjectProduct, ProjectTask, RequestResetPassword, ResetPassword, SignUp } from '../pages';
import LayoutAuth from '../shared/layouts/LayoutAuth';
import ProtectedRoutes from './ProtectedRoutes';
import NoAuthRoutes from './NoAuthRoutes';
import { MembersLoader, ProductsLoader, ProjectLoader, TasksLoader, UserLoader } from '../shared/loaders';
import { ProjectMember } from '../pages/project/projectMember/ProjectMember';
import { BudgetLoader } from '../shared/loaders/BudgetLoader';


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
                        element: <ProjectPage />,
                        loader: ({ params }) => ProjectLoader(parseInt(params.id ?? '')),
                        children: [
                            {
                                path: '/project/:id/',
                                element: <ProjectIndex />
                            },
                            {
                                path: '/project/:id/tasks',
                                loader: ({ params }) => TasksLoader(parseInt(params.id ?? '')),
                                element: <ProjectTask />
                            },
                            {
                                path: '/project/:id/members',
                                loader: ({ params }) => MembersLoader(parseInt(params.id ?? '')),
                                element: <ProjectMember />
                            },
                            {
                                path: '/project/:id/products',
                                loader: ({ params }) => ProductsLoader(parseInt(params.id ?? '')),
                                element: <ProjectProduct />
                            },
                            {
                                path: '/project/:id/budget',
                                loader: ({ params }) => BudgetLoader(parseInt(params.id ?? '')),
                                element: <ProjectBudget />
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