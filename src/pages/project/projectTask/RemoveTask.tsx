import { useState } from 'react';
import { Fab, Icon, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

import { TaskContext } from '../../../shared/types/Types';
import { useParams } from 'react-router-dom';
import { deleteTask } from '../../../shared/services/api/taskService/TaskService';

interface TaskProps extends TaskContext {
    id: number;
    name_task: string;
}

export default function RemoveTask(props: TaskProps) {
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    const params = useParams();
    const project_id = parseInt(params.id ?? '');

    function handleDelete() {
        deleteTask(project_id, props.id)
            .then(() => {
                const newTasks = props.tasks?.filter(t => t.id !== props.id);
                if (newTasks) {
                    props.setTasks((oldTasks) => {
                        if (oldTasks) {
                            return newTasks;
                        }
                        return [];
                    });
                }
            })
            .catch(() => {
                console.error('Error ao deletar projeto.');
            })
            .finally(() => {
                toggleOpen();
            });
    }

    return (
        <>
            <Fab
                size='small'
                color='error'
                onClick={toggleOpen}
            >
                <Icon>delete</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
            >
                <DialogTitle align='center' >
                    Deseja realmente deletar a tarefa?
                </DialogTitle>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <Button variant='outlined' onClick={toggleOpen}>Cancelar</Button>
                    <Button onClick={handleDelete}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}