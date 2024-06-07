import { useEffect, useState } from 'react';
import { Fab, Icon, Dialog, DialogTitle, DialogActions, Button, DialogContent, MenuItem, Select, SelectChangeEvent, Divider } from '@mui/material';

import { Member, TaskContext } from '../../../shared/types/Types';
import { useParams } from 'react-router-dom';
import { assignMember } from '../../../shared/services/api/taskService/TaskService';
import { getMembers } from '../../../shared/services/api/memberService/MemberService';

interface TaskProps extends TaskContext {
    task_id: number;
}

export default function AssignMember(props: TaskProps) {
    const [memberId, setMemberId] = useState(0);

    const [members, setMembers] = useState<Member[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setMemberId(parseInt(event.target.value));
    };

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    const params = useParams();
    const project_id = parseInt(params.id ?? '');


    useEffect(() => {
        getMembers(project_id)
            .then((response) => {
                if (response) {
                    setMembers(response);
                }
            })
            .catch((error) => {
                console.error('Error fetching project members:', error);
            });
    }, [project_id]);

    function handleAssignMember(member_id: number) {
        assignMember(project_id, props.task_id, member_id)
            .then(() => {
                props.setTasks((oldTasks) => {
                    if (oldTasks) {
                        return oldTasks.map(task => {
                            if (task.id === props.task_id) {
                                return {
                                    ...task,
                                    members: [...task.members, { id: member_id, role: '', name_member: '' }]
                                };
                            }
                            return task;
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
                    Informer o membro que deseja adicionar a tarefa:
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Select
                        fullWidth
                        onChange={handleChange}
                        value={memberId.toString()}
                    >
                        {members.length > 0 ? members.map((member) => (
                            <MenuItem key={member.id} value={member.id}>
                                {member.name_member}
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
                    <Button disabled={memberId == 0} onClick={() => handleAssignMember(memberId)}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}