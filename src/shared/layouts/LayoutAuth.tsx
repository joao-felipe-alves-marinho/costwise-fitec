import { useState } from 'react';
import { AppBar, Box, ButtonBase, Icon, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import { User, UserContext } from '../types/Types';
import { logout } from '../services/api/authService/AuthService';


export default function LayoutAuth() {
    const [user, setUser] = useState<User | null>(useLoaderData() as User);

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
        <Box height='100vh' width='100%' display='flex' flexDirection='column'>
            <AppBar position='static' color='primary' enableColorOnDark>
                <Toolbar
                    disableGutters
                    component={Box}
                    display='flex'
                    justifyContent='space-between'
                    px={2}
                >

                    <ButtonBase onClick={() => (navigate('/'))} >
                        <img src='/logo.png' alt='logo' height='56'/>
                    </ButtonBase>
                    <Box display='flex' alignItems='center' >
                        <Typography variant='h5'>{user ? user.username : 'null'}</Typography>
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
            <Box flex={1} overflow='auto' mx={8} >
                <Outlet context={{ user, setUser } satisfies UserContext} />
            </Box>
        </Box>
    );
}