import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MemberContext, MemberData } from '../../../shared/types/Types';
import { useParams } from 'react-router-dom';
import { updateMember } from '../../../shared/services/api/memberService/MemberService';

interface MemberProps extends MemberContext {
    member_id: number;
    name_member: string;
    role: string;
    salary: number;
}

const UpdateMemberSchema = yup.object({
    name_member: yup.string().min(5, 'O nome do membro deve ter pelo menos 5 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    role: yup.string().max(255, 'O cargo deve ter no máximo 500 caracteres.'),
    salary: yup.number().min(0, 'O salário deve ser maior que 0.')
});

export default function EditMember(props: MemberProps) {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            name_member: props.name_member,
            role: props.role,
            salary: props.salary,
        },
        resolver: yupResolver(UpdateMemberSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const params = useParams();
    const project_id = parseInt(params.id ?? '');


    function onSubmit(data: Partial<MemberData>) {
        setIsLoading(true);
        setSuccess(false);
        updateMember(project_id, props.member_id, data)
            .then(() => {
                setSuccess(true);
                window.location.reload();
            })
            .catch(() => {
                console.error('Erro ao editar membro.');
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
            <Fab size='small' color='primary' onClick={toggleOpen} >
                <Icon>edit</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>Atualizar Membro</DialogTitle>
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
                            fullWidth
                        />
                        <TextField
                            {...register('role')}
                            error={!!errors.role}
                            helperText={errors.role?.message}
                            disabled={isLoading || success}
                            label='Cargo do Membro'
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
                            type='number'
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpen} type='submit' disabled={!isDirty || !isValid} >
                        Atualizar membro
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}