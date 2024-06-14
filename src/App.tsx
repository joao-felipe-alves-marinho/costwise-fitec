import { RouterProvider } from 'react-router-dom';

import router from './router/Router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale';

function App() {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <RouterProvider router={router} />
            </LocalizationProvider>
        </>
    );
}

export default App;
