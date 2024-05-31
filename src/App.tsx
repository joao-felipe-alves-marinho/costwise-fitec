import { RouterProvider } from 'react-router-dom';

import router from './router/Router';
import { AuthProvider } from './shared/contexts';

function App() {

    return (
        <>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    );
}

export default App;
