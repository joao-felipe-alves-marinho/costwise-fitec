import { Box, Button, Divider, Link, Paper, TextField, Typography } from '@mui/material';

export function Login() {
    return (
        <Box
            position='absolute'
            width='100%'
            height='80%'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap={8}
        >
            <Typography variant="h2">LOGO</Typography>
            <Box component={Paper}
                width={568}
                display='flex'
                flexDirection='column'
                p={4}
                gap={2}
                borderRadius={2}
            >
                <Typography variant="h4">Faça Login na CostWise</Typography>
                <Divider />
                <Box
                    display='flex'
                    flexDirection='column'
                    gap={2}
                >
                    <TextField label='Username' placeholder="Jean Lucas" />
                    <TextField label='Senha' placeholder="*********" type="password" />
                    <Link href='#' align="right">Esqueceu a senha?</Link>
                    <Button
                        variant="contained"
                        fullWidth
                    >
                        ENTRAR
                    </Button>
                </Box>
                <Typography align="center">Ainda não possui uma conta? <Link href='#'>Cadastre-se</Link></Typography>
            </Box>
        </Box>
    );
} 