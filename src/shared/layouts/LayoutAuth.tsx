import { useState } from 'react';
import { AppBar, Box, Icon, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import { logout } from '../services/api/authService/AuthService';
import { User } from '../types/Types';

export default function LayoutAuth() {
    const user = useLoaderData() as User;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        setAnchorEl(null);
        logout()
            .then(() => {
                navigate('/login');
            }).catch(() => {
                console.error('Erro ao fazer logout');
            });
    }

    return (
        <Box height='100vh' width='100%' display='flex' flexDirection='column' gap={2}>
            <AppBar position='static' color='primary' enableColorOnDark>
                <Toolbar
                    disableGutters
                    component={Box}
                    display='flex'
                    justifyContent='space-between'
                    px={2}
                >
                    <Typography variant='h4'>LOGO</Typography>
                    <Box display='flex' alignItems='center' >
                        <Typography variant='h5'>{user.username}</Typography>
                        <IconButton
                            onClick={handleClick}
                            size='large'
                            color='inherit'
                            aria-label='open-settings'
                        >
                            <Icon sx={{ fontSize: 30 }} >settings</Icon>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box flex={1} overflow='auto'>
                <Outlet />
            </Box>
        </Box>
    );
}