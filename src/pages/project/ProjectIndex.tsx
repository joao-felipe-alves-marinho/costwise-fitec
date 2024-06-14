import { Box, Divider, Grid, LinearProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import { useNavigation, useOutletContext } from 'react-router-dom';
import { ProjectContext } from '../../shared/types/Types';
import ProjectEdit from './ProjectEdit';
import ProjectDelete from './ProjectDelete';

export function ProjectIndex() {
    const { project, setProject } = useOutletContext<ProjectContext>();

    function formatDate(date: string) {
        const parts = date.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <LinearProgress sx={{mt: 32}} />;
    }

    return (
        <Box m={4}>
            <Grid container spacing={8}>
                <Grid item xs={7}>
                    <TextField
                        label='Descrição do Projeto'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={'Descrição do Projeto'}
                        multiline
                        rows={5}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={5}>
                    <Stack
                        component={Paper}
                        elevation={4}
                        p={2}
                        spacing={1}
                    >
                        <Typography align='center' variant='h5'>Prazo:</Typography>
                        <Typography color='primary' align='center' variant='h5'>{project?.deadline && formatDate(project.deadline)}</Typography>
                        <Divider />
                        <Typography align='center' variant='body1'>Data de Inicio: {project?.created_at && formatDate(project.created_at)}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        component={Paper}
                        elevation={4}
                        display='flex'
                        justifyContent={'space-around'}
                        p={2}
                    >
                        <Typography variant='body1' align='center'>Tarefas: {project?.tasks.length}</Typography>
                        <Divider orientation='vertical' flexItem />
                        <Typography variant='body1' align='center'>Membros: {project?.members.length}</Typography>
                        <Divider orientation='vertical' flexItem />
                        <Typography variant='body1' align='center'>Produtos: {project?.products.length}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex' justifyContent='space-around' >
                        <ProjectEdit project={project} setProject={setProject} />
                        <ProjectDelete project={project} setProject={setProject} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
