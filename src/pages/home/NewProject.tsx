import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Project, ProjectData, UserContext } from '../../shared/types/Types';
import { createProject } from '../../shared/services/api/projectService/ProjectService';

const NewProjectSchema = yup.object({
    name_project: yup.string().required('Esse campo é obrigatório.').min(5, 'O nome do projeto deve ter pelo menos 5 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    description_project: yup.string().max(255, 'A descrição do projeto deve ter no máximo 500 caracteres.'),
    deadline: yup.string().required('Esse campo é obrigatório.'),
    expected_budget: yup.number().min(0, 'O orçamento esperado deve ser maior ou igual a 0.'),
});

export default function NewProject(props: UserContext) {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            name_project: '',
            description_project: '',
            deadline: '',
            expected_budget: 0,
        },
        resolver: yupResolver(NewProjectSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function onSubmit(data: ProjectData) {
        setIsLoading(true);
        setSuccess(false);
        createProject(data)
            .then((response: Project | null) => {
                setSuccess(true);
                props.setUser((oldUser) => {
                    if (oldUser && response) {
                        return {
                            ...oldUser,
                            projects: [...oldUser.projects, response]
                        };
                    }
                    return null;
                });
            })
            .catch(() => {
                console.error('Erro ao criar novo projeto.');
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
                Novo Projeto
                <Icon>add</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>Novo Projeto</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2} >
                        <TextField
                            {...register('name_project')}
                            error={!!errors.name_project}
                            helperText={errors.name_project?.message}
                            disabled={isLoading || success}
                            label='Nome do Projeto'
                            placeholder='Projeto 1'
                            required
                            fullWidth
                        />
                        <TextField
                            {...register('description_project')}
                            error={!!errors.description_project}
                            helperText={errors.description_project?.message}
                            disabled={isLoading || success}
                            label='Descrição do Projeto'
                            placeholder='Descrição do Projeto 1'
                            fullWidth
                        />
                        <TextField
                            {...register('deadline')}
                            error={!!errors.deadline}
                            helperText={errors.deadline?.message}
                            disabled={isLoading || success}
                            label='Prazo do Projeto'
                            placeholder='YYYY-MM-DD'
                            required
                            fullWidth
                        />
                        <TextField
                            {...register('expected_budget')}
                            error={!!errors.expected_budget}
                            helperText={errors.expected_budget?.message}
                            disabled={isLoading || success}
                            label='Orçamento Esperado'
                            type='number'
                            placeholder='1000'
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpen} type='submit' disabled={!isDirty || !isValid} >
                        Criar novo projeto
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}