import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { deleteProject } from '../../shared/services/api/projectService/ProjectService';
import { ProjectContext } from '../../shared/types/Types';

export default function ProjectDelete(props: ProjectContext) {
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    const navigate = useNavigate();

    function handleDelete() {
        if (props.project?.id) {
            deleteProject(props.project.id)
                .then(() => {
                    window.location.reload();
                    navigate('/');
                })
                .catch(() => {
                    console.error('Error ao deletar projeto.');
                })
                .finally(() => {
                    toggleOpen();
                });
        }
    }

    return (
        <>
            <Button size='large' color='error' onClick={toggleOpen} >Deletar</Button>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
            >
                <DialogTitle align='center' >
                    Deseja realmente deletar o projeto?
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