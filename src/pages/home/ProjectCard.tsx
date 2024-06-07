import { useState } from 'react';
import { Typography, Fab, Icon, Card, CardContent, CardActions, CardActionArea, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { deleteProject } from '../../shared/services/api/projectService/ProjectService';
import { UserContext } from '../../shared/types/Types';

interface ProjectCard extends UserContext{
    id: number;
    name_project: string;
}

export default function ProjectCard(project: ProjectCard) {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    function handleDelete() {
        deleteProject(project.id)
            .then(() => {
                const newProjects = project.user?.projects.filter(p => p.id !== project.id);
                if (newProjects) {
                    project.setUser((oldUser) => {
                        if (oldUser) {
                            return {
                                ...oldUser,
                                projects: newProjects
                            };
                        }
                        return null;
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
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderLeft: '4px solid',
            }}
            elevation={3}
        >
            <CardActionArea
                onClick={() => navigate(`/project/${project.id}`)}
            >
                <CardContent>
                    <Typography >
                        {project.name_project}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
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
            </CardActions>
        </Card >
    );
}