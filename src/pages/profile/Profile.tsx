import { Box, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

export function Profile() {
    const context = useOutletContext();
    const { user } = context as {
        user: {
            id: string;
            email: string;
            name: string;
        }
    };
    return (
        <Box>
            <Typography variant='h1'>{user.name}</Typography>
        </Box>
    );
}