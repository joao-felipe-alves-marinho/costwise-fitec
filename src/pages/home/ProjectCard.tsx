import { Typography, Fab, Icon, Card, CardContent, CardActions, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProjectCard {
    id: number;
    name_project: string;
}

export default function ProjectCard(project: ProjectCard) {
    const navigate = useNavigate();


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
                >
                    <Icon>delete</Icon>
                </Fab>
            </CardActions>
        </Card >
    );
}