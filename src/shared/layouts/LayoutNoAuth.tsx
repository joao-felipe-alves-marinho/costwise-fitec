import { Box, Container, Paper, Typography } from '@mui/material';

import { ReactNode } from 'react';

export default function LayoutNoAuth({ children }: { children: ReactNode }) {
    return (
        <Container
            fixed
        >
            <Typography
                variant="h2"
                align='center'
                mt={8}
            >
                LOGO
            </Typography>
            <Box component={Paper}
                display='flex'
                flexDirection='column'
                p={4}
                gap={2}
                elevation={4}
                borderRadius={2}
                alignSelf='center'
                mx={40}
            >
                {children}
            </Box>
        </Container>
    );
}