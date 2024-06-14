import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { TaskContext, TaskData } from '../../../shared/types/Types';
import { updateTask } from '../../../shared/services/api/taskService/TaskService';
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

interface TaskProps extends TaskContext {
    task_id: number;
    name_task: string;
    description_task?: string;
    deadline: string;
}

const EditTaskSchema = yup.object({
    name_task: yup.string().min(5, 'O nome da tarefa deve ter pelo menos 5 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    description_task: yup.string().max(255, 'A descrição da tarefa deve ter no máximo 500 caracteres.'),
    deadline: yup.string(),
});

export default function EditTask(props: TaskProps) {
    const { register, control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            name_task: props.name_task,
            description_task: props.description_task,
            deadline: props.deadline,
        },
        resolver: yupResolver(EditTaskSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const params = useParams();
    const project_id = parseInt(params.id ?? '');


    function onSubmit(data: Partial<TaskData>) {
        setIsLoading(true);
        setSuccess(false);
        if (data.deadline) {
            const deadlineFormat = format(new Date(data.deadline), 'yyyy-MM-dd');
            if (props.task_id) {
                updateTask(project_id, props.task_id, { ...data, deadline: deadlineFormat })
                    .then(() => {
                        setSuccess(true);
                        window.location.reload();
                    })
                    .catch(() => {
                        console.error('Erro ao criar nova tarefa.');
                    })
                    .finally(() => {
                        setIsLoading(false);
                        setSuccess(false);
                    });
            }
        }
        updateTask(project_id, props.task_id, data)
            .then(() => {
                setSuccess(true);
                window.location.reload();
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
                <DialogTitle>Atualizar Tarefa</DialogTitle>
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
                        <Controller
                            control={control}
                            name='deadline'
                            render={({ field }) => {
                                return (
                                    <DatePicker
                                        label='Prazo da Tarefa'
                                        disablePast
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                        value={field.value ? new Date(field.value) : null}
                                        inputRef={field.ref}
                                        onChange={(date) => {
                                            field.onChange(date);
                                        }}
                                        slotProps={{
                                            textField: {
                                                required: true,
                                                error: !!errors.deadline,
                                                helperText: errors.deadline?.message,
                                            },
                                        }}
                                    />
                                );
                            }}
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