import { useState } from 'react';
import { Typography, Divider, Box, Alert, TextField, IconButton, Icon, Button, CircularProgress, Link } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { createUser } from '../../shared/services/api/userService/UserService';
import LayoutNoAuth from '../../shared/layouts/LayoutNoAuth';
import { useNavigate } from 'react-router-dom';

interface SignUpForm {
    username: string;
    email: string;
    password: string;
}

const SignUpSchema = yup.object({
    username: yup.string().required('Esse campo é obrigatorio.').min(5, 'O nome deve ter pelo menos 5 caracteres.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
    email: yup.string().lowercase().required('Esse campo é obrigatorio.').email('E-mail invalido.').min(5, 'O e-mail deve ter pelo menos 5 caracteres').max(255, 'O e-mail deve ter no máximo 255 caracteres.'),
    password: yup.string().required('Esse campo é obrigatorio.').min(5, 'A senha deve ter pelo menos 5 caracteres.').max(255, 'A senha deve ter no máximo 255 caracteres.'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'As senhas não coincidem.'),
});

export function SignUp() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        resolver: yupResolver(SignUpSchema),
        mode: 'onChange'
    });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    function onSubmit(data: SignUpForm) {
        setIsLoading(true);
        setAlert(false);
        createUser({
            username: data.username,
            email: data.email,
            password: data.password
        }
        )
            .then(() => {
                navigate('/login');
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
            <Typography variant="h4">Crie uma conta na CostWise</Typography>
            <Divider />
            <Box
                display='flex'
                flexDirection='column'
                gap={2}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                {alert && <Alert severity='error' variant='filled'>Username ou E-mail já está registrado</Alert>}
                <TextField
                    label='E-mail'
                    placeholder='jean@gmail.com'
                    type='email'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isLoading}
                />
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
                <TextField
                    label='Confirmar a Senha'
                    placeholder="*********"
                    type={showPassword ? 'text' : 'password'}
                    {...register('passwordConfirmation')}
                    error={!!errors.passwordConfirmation}
                    helperText={errors.passwordConfirmation?.message}
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
                <Button
                    fullWidth
                    type='submit'
                    disabled={!isDirty || !isValid || isLoading}
                >
                    {isLoading ? <CircularProgress /> : 'Cadastrar'}
                </Button>
            </Box>
            <Typography align="center">Já possui uma conta? <Link href='/login'>Login</Link></Typography>
        </LayoutNoAuth >
    );
}