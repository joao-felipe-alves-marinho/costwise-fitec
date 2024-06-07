import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ProjectContext, ProjectData } from '../../shared/types/Types';
import { updateProject } from '../../shared/services/api/projectService/ProjectService';

const UpdateProjectSchema = yup.object({
    name_project: yup.string().min(5, 'O nome do projeto deve ter pelo menos 5 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    description_project: yup.string().max(255, 'A descrição do projeto deve ter no máximo 500 caracteres.'),
    deadline: yup.string(),
    expected_budget: yup.number().min(0, 'O orçamento esperado deve ser maior ou igual a 0.'),
});

export default function ProjectEdit(props: ProjectContext) {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            name_project: props.project?.name_project,
            description_project: props.project?.description_project,
            deadline: props.project?.deadline,
            expected_budget: props.project?.expected_budget,
        },
        resolver: yupResolver(UpdateProjectSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function onSubmit(data: Partial<ProjectData>) {
        setIsLoading(true);
        setSuccess(false);
        if (props.project?.id) {
            updateProject(props.project.id, data)
                .then((response) => {
                    setSuccess(true);
                    props.setProject(response);
                })
                .catch(() => {
                    console.error('Erro ao criar novo projeto.');
                })
                .finally(() => {
                    setIsLoading(false);
                    setSuccess(false);
                });
        }

    }

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }
    return (
        <>
            <Button size='large' onClick={toggleOpen} >Editar</Button>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle align='center' >
                    Editar Projeto:
                </DialogTitle>
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
                            multiline
                        />
                        <TextField
                            {...register('deadline')}
                            error={!!errors.deadline}
                            helperText={errors.deadline?.message}
                            disabled={isLoading || success}
                            label='Prazo do Projeto'
                            placeholder='YYYY-MM-DD'
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
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <Button variant='outlined' onClick={toggleOpen}>Cancelar</Button>
                    <Button type='submit' disabled={!isDirty || !isValid} >Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}