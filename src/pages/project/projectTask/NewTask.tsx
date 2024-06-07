import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { TaskContext, TaskData } from '../../../shared/types/Types';
import { createTask } from '../../../shared/services/api/taskService/TaskService';
import { useParams } from 'react-router-dom';

const NewTaskSchema = yup.object({
    name_task: yup.string().required('Esse campo é obrigatório.').min(5, 'O nome da tarefa deve ter pelo menos 5 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    description_task: yup.string().max(255, 'A descrição da tarefa deve ter no máximo 500 caracteres.'),
    deadline: yup.string().required('Esse campo é obrigatório.'),
});

export default function NewTask(props: TaskContext) {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            name_task: '',
            description_task: '',
            deadline: '',
        },
        resolver: yupResolver(NewTaskSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const params = useParams();
    const project_id = parseInt(params.id ?? '');


    function onSubmit(data: TaskData) {
        setIsLoading(true);
        setSuccess(false);
        createTask(project_id, data)
            .then((response) => {
                setSuccess(true);
                props.setTasks((oldTasks) => {
                    if (oldTasks && response) {
                        return [...oldTasks, response];
                    }
                    return [];
                });
            })
            .catch(() => {
                console.error('Erro ao criar nova tarefa.');
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
                Nova Tarefa
                <Icon>add</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>Nova Tarefa</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2} >
                        <TextField
                            {...register('name_task')}
                            error={!!errors.name_task}
                            helperText={errors.name_task?.message}
                            disabled={isLoading || success}
                            label='Nome da Tarefa'
                            placeholder='Tarefa 1'
                            required
                            fullWidth
                        />
                        <TextField
                            {...register('description_task')}
                            error={!!errors.description_task}
                            helperText={errors.description_task?.message}
                            disabled={isLoading || success}
                            label='Descrição da Tarefa'
                            placeholder='Descrição da Tarefa 1'
                            fullWidth
                        />
                        <TextField
                            {...register('deadline')}
                            error={!!errors.deadline}
                            helperText={errors.deadline?.message}
                            disabled={isLoading || success}
                            label='Prazo da Tarefa'
                            placeholder='YYYY-MM-DD'
                            required
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpen} type='submit' disabled={!isDirty || !isValid} >
                        Criar nova tarefa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}