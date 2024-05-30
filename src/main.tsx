import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material';
import Light from './shared/themes/Light.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={Light}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
