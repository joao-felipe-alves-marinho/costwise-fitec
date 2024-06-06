import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, Icon, IconButton, Link, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { login } from '../../shared/services/api/authService/AuthService';
import LayoutNoAuth from '../../shared/layouts/LayoutNoAuth';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
    username: string;
    password: string;
}

const loginSchema = yup.object({
    username: yup.string().required('Username é obrigatório'),
    password: yup.string().required('Senha é obrigatória')
});


export function Login() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
        mode: 'onChange'
    });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    function onSubmit(data: LoginForm) {
        setIsLoading(true);
        setSuccess(false);
        setAlert(false);
        login(data)
            .then(() => {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch(() => {
                setAlert(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const [showPassword, setShowPassword] = useState(false);
    function toggleShowPassword() { setShowPassword((show) => !show); }

    return (
        <LayoutNoAuth>
            <Typography variant="h4">Faça Login na CostWise</Typography>
            <Divider />
            <Box
                display='flex'
                flexDirection='column'
                gap={2}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                {alert && <Alert severity='error' variant='filled'>Credenciais Inválidas</Alert>}
                {success && <Alert severity='success' variant='filled'>Login efetuado com sucesso</Alert>}
                <TextField
                    label='Username'
                    placeholder="Jean Lucas"
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    disabled={isLoading}
                />
                <TextField
                    label='Senha'
                    placeholder="*********"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    disabled={isLoading}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label='show-password'
                                size='large'
                                onClick={toggleShowPassword}
                            >
                                <Icon>{showPassword ? 'visibility_off' : 'visibility'}</Icon>
                            </IconButton>
                        ),
                    }}
                />
                <Link href='/recover-password' align="right">Esqueceu a senha?</Link>
                <Button
                    fullWidth
                    type='submit'
                    disabled={!isDirty || !isValid || isLoading}
                >
                    {isLoading ? <CircularProgress /> : 'Entrar'}
                </Button>
            </Box>
            <Typography align="center">Ainda não possui uma conta? <Link href='/signup'>Cadastre-se</Link></Typography>
        </LayoutNoAuth >
    );
} 