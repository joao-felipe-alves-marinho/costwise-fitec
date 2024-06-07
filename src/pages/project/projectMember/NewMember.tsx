import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MemberContext, MemberData } from '../../../shared/types/Types';
import { useParams } from 'react-router-dom';
import { createMember } from '../../../shared/services/api/memberService/MemberService';

const NewMemberSchema = yup.object({
    name_member: yup.string().required('Esse campo é obrigatório.').min(5, 'O nome do membro deve ter pelo menos 5 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    role: yup.string().required('Esse campo é obrigatório.').max(255, 'O cargo deve ter no máximo 500 caracteres.'),
    salary: yup.number().required('Esse campo é obrigatório.').min(0, 'O salário deve ser maior que 0.')
});

export default function NewTask(props: MemberContext) {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            name_member: '',
            role: '',
            salary: 0,
        },
        resolver: yupResolver(NewMemberSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const params = useParams();
    const project_id = parseInt(params.id ?? '');


    function onSubmit(data: MemberData) {
        setIsLoading(true);
        setSuccess(false);
        createMember(project_id, data)
            .then((response) => {
                setSuccess(true);
                props.setMembers((oldTasks) => {
                    if (oldTasks && response) {
                        return [...oldTasks, response];
                    }
                    return [];
                });
            })
            .catch(() => {
                console.error('Erro ao criar novo membro.');
            })
            .finally(() => {
                setIsLoading(false);
                setSuccess(false);
            });
    }

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    return (
        <>
            <Fab variant='extended' color='primary' onClick={toggleOpen} >
                Novo Membro
                <Icon>add</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>Novo Membro</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2} >
                        <TextField
                            {...register('name_member')}
                            error={!!errors.name_member}
                            helperText={errors.name_member?.message}
                            disabled={isLoading || success}
                            label='Nome do Membro'
                            placeholder='Jean Lucas'
                            required
                            fullWidth
                        />
                        <TextField
                            {...register('role')}
                            error={!!errors.role}
                            helperText={errors.role?.message}
                            disabled={isLoading || success}
                            label='Cargo'
                            placeholder='Dev Frontend'
                            fullWidth
                        />
                        <TextField
                            {...register('salary')}
                            error={!!errors.salary}
                            helperText={errors.salary?.message}
                            disabled={isLoading || success}
                            label='Salário do Membro'
                            placeholder='2000'
                            required
                            type='number'
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpen} type='submit' disabled={!isDirty || !isValid} >
                        Criar novo membro
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}