import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { useNavigation, useOutletContext } from 'react-router-dom';

import { UserContext } from '../../shared/types/Types';
import ProjectCard from './ProjectCard';
import NewProject from './NewProject';

export function Home() {
    const { user, setUser } = useOutletContext<UserContext>();

    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <LinearProgress sx={{mt: 32}} />;
    }

    return (
        <Stack spacing={4} mt={8}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
            >
                <Typography variant="h4" align='center' >Projetos:</Typography>
                <NewProject user={user} setUser={setUser} />
            </Box>
            <Stack spacing={2} >
                {user?.projects.length ?? 0 > 0 ? user?.projects.map(project => (
                    <ProjectCard key={project.id} {...project} user={user} setUser={setUser} />
                )) : <Typography variant='h5' align='center' >Nenhum projeto criado</Typography>}
            </Stack >
        </Stack>
    );
}