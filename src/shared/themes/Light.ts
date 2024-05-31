import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: indigo[700],
        },
    },
    typography: {
        allVariants: {
            fontFamily: 'Arial, Roboto, sans-serif',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            },
        },
        MuiLink: {
            defaultProps: {
                fontFamily: 'Arial, Roboto, sans-serif',
                fontWeight: '600',
            }
        }
    }
}, ptBR);

export default theme;