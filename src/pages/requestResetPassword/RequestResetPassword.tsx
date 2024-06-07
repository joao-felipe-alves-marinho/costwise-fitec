import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, Link, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { requestResetPassword } from '../../shared/services/api/authService/AuthService';
import LayoutNoAuth from '../../shared/layouts/LayoutNoAuth';

interface RequestResetPasswordForm {
    email: string;
}

const RequestResetPasswordSchema = yup.object({
    email: yup.string().lowercase().required('Esse campo é obrigatorio.').email('E-mail invalido.').min(5, 'O e-mail deve ter pelo menos 5 caracteres').max(255, 'O e-mail deve ter no máximo 255 caracteres.'),
});

export function RequestResetPassword() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(RequestResetPasswordSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);


    function onSubmit(data: RequestResetPasswordForm) {
        setIsLoading(true);
        setAlert(false);
        setSuccess(false);
        requestResetPassword(data)
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
                {alert && <Alert severity='error' variant='filled'>E-mail não encontrado</Alert>}
                {success && <Alert severity='success' variant='filled'>E-mail enviado com sucesso</Alert>}
                <TextField
                    label='E-mail'
                    placeholder='jean@gmail.com'
                    type='email'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isLoading}
                />
                <Typography>
                    Enviaremos um e-mail com um link para que você possa redefinir sua senha.
                </Typography>
                <Button
                    fullWidth
                    type='submit'
                    disabled={!isDirty || !isValid || isLoading}
                >
                    {isLoading ? <CircularProgress /> : 'Enviar e-mail de recuperação'}
                </Button>
            </Box>
            <Typography align="center"><Link href='/login'>Voltar ao Login</Link></Typography>
        </LayoutNoAuth>
    );
}