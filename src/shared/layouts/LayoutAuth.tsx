import { Box, Paper, Typography } from '@mui/material';

import { ReactNode } from 'react';

export default function LayoutAuth({ children }: { children: ReactNode }) {
    return (
        <Box
            position='absolute'
            width='100%'
            height='90vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap={1}
            my='auto'
        >
            <Typography variant="h2">LOGO</Typography>
            <Box component={Paper}
                width={568}
                display='flex'
                flexDirection='column'
                p={4}
                gap={2}
                elevation={4}
                borderRadius={2}
            >
                {children}
            </Box>
        </Box>
    );
}