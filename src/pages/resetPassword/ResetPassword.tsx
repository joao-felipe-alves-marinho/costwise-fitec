import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, Icon, IconButton, Link, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { resetPassword } from '../../shared/services/api/authService/AuthService';
import LayoutNoAuth from '../../shared/layouts/LayoutNoAuth';

interface ResetPasswordForm {
    password: string;
}

const ResetPasswordSchema = yup.object({
    password: yup.string().required('Esse campo é obrigatorio.').min(5, 'A senha deve ter pelo menos 5 caracteres.').max(255, 'A senha deve ter no máximo 255 caracteres.'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'As senhas não coincidem.'),
});

export function ResetPassword() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            password: '',
            passwordConfirmation: '',
        },
        resolver: yupResolver(ResetPasswordSchema),
        mode: 'onChange'
    });

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') ?? '';

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);


    function onSubmit(data: ResetPasswordForm) {
        setIsLoading(true);
        setAlert(false);
        setSuccess(false);
        resetPassword({ new_password: data.password, token: token})
            .then(() => {
                setSuccess(true);
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
            <Typography variant="h4">Recupere sua senha</Typography>
            <Divider />
            <Box
                display='flex'
                flexDirection='column'
                gap={2}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                {alert && <Alert severity='error' variant='filled'>Tempo</Alert>}
                {success && <Alert severity='success' variant='filled'>Senha alterada com sucesso</Alert>}
                <TextField
                    label='Nova Senha'
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
                    label='Confirmar nova Senha'
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
                    {isLoading ? <CircularProgress /> : 'Confirmar Nova Senha'}
                </Button>
            </Box>
            <Typography align="center"><Link href='/login'>Voltar ao Login</Link></Typography>
        </LayoutNoAuth>
    );
}