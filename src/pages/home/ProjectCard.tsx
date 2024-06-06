import { Typography, Fab, Icon, Card, CardContent, CardActions, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { deleteProject } from '../../shared/services/api/projectService/ProjectService';
import { UserContext } from '../../shared/types/Types';

interface ProjectCard {
    id: number;
    name_project: string;
}

export default function ProjectCard(project: ProjectCard, props: UserContext) {
    const navigate = useNavigate();

    const projects = props.user?.projects;
    console.log(projects);

    function handleDelete() {
        deleteProject(project.id)
            .then(() => {
            })
            .catch(() => {
                console.error('Error ao deletar projeto.');
            });
    }

    return (
        <Card sx={{
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
                    onClick={handleDelete}
                >
                    <Icon>delete</Icon>
                </Fab>
            </CardActions>
        </Card >
    );
}