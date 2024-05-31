import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Arial, Roboto, sans-serif',
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                fontFamily: 'Arial, Roboto, sans-serif'
            }
        }
    }
}, ptBR);

export default theme;