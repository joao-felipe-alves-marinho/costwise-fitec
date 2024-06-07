import { useState } from 'react';
import { Fab, Icon, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

import { MemberContext } from '../../../shared/types/Types';
import { useParams } from 'react-router-dom';
import { deleteMember } from '../../../shared/services/api/memberService/MemberService';

interface MemberProps extends MemberContext {
    id: number;
}

export default function RemoveTask(props: MemberProps) {
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    const params = useParams();
    const project_id = parseInt(params.id ?? '');

    function handleDelete() {
        deleteMember(project_id, props.id)
            .then(() => {
                const newMembers = props.members?.filter(t => t.id !== props.id);
                if (newMembers) {
                    props.setMembers((oldMembers) => {
                        if (oldMembers) {
                            return newMembers;
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
                    Deseja realmente deletar o membro?
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