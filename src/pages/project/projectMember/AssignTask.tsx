import { useEffect, useState } from 'react';
import { Fab, Icon, Dialog, DialogTitle, DialogActions, Button, DialogContent, MenuItem, Select, SelectChangeEvent, Divider } from '@mui/material';

import { Task, MemberContext } from '../../../shared/types/Types';
import { useParams } from 'react-router-dom';
import { getTasks } from '../../../shared/services/api/taskService/TaskService';
import { assignTask } from '../../../shared/services/api/memberService/MemberService';

interface MemberProps extends MemberContext {
    member_id: number;
}

export default function AssignMember(props: MemberProps) {
    const [taskId, setTaskId] = useState(0);

    const [tasks, setTasks] = useState<Task[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setTaskId(parseInt(event.target.value));
    };

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    const params = useParams();
    const project_id = parseInt(params.id ?? '');


    useEffect(() => {
        getTasks(project_id)
            .then((response) => {
                if (response) {
                    setTasks(response);
                }
            })
            .catch((error) => {
                console.error('Error fetching project tasks:', error);
            });
    }, [project_id]);

    function handleAssignMember(task_id: number) {
        assignTask(project_id, props.member_id, task_id)
            .then(() => {
                props.setMembers((oldMembers) => {
                    if (oldMembers) {
                        return oldMembers.map(member => {
                            if (member.id === props.member_id) {
                                return {
                                    ...member,
                                    tasks: [...member.tasks, { id: task_id, name_task: '' }]
                                };
                            }
                            return member;
                        });
                    }
                    return [];
                });
            })
            .catch(() => {
                console.error('Error ao adicionar membro a tarefa.');
            })
            .finally(() => {
                toggleOpen();
            });
    }

    return (
        <>
            <Fab
                size='small'
                color='success'
                onClick={toggleOpen}
            >
                <Icon>person_add</Icon>
            </Fab>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
            >
                <DialogTitle align='center' >
                    Informer a tarefa que deseja adicionar ao membro:
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Select
                        fullWidth
                        onChange={handleChange}
                        value={taskId.toString()}
                    >
                        {tasks.length > 0 ? tasks.map((task) => (
                            <MenuItem key={task.id} value={task.id}>
                                {task.name_task}
                            </MenuItem>
                        )) : <MenuItem value={0}>Nenhum membro disponível</MenuItem>}
                    </Select>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <Button variant='outlined' onClick={toggleOpen}>Cancelar</Button>
                    <Button disabled={taskId == 0} onClick={() => handleAssignMember(taskId)}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}