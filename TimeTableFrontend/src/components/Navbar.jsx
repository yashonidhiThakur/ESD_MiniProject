import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.png';

const Navbar = ({ name, onLogout }) => {
    return (
        <AppBar position="static" sx={{
            background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            borderRadius: '0 0 16px 16px',
            mb: 4
        }}>
            <Toolbar>
                <Box
                    component="img"
                    src={logo}
                    alt="IIITB Logo"
                    sx={{
                        height: 50,
                        mr: 2,
                        // filter: 'brightness(0) invert(1)', // Removed to show original logo
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.1)' }
                    }}
                />

                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '1px' }}>
                    TimeTable
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'yellow', display: { xs: 'none', sm: 'block' } }}>
                        WELCOME, {name ? name.toUpperCase() : 'STUDENT'}
                    </Typography>

                    <Button
                        color="inherit"
                        href="/courses"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            mr: 2,
                            fontFamily: "'Arial', sans-serif"
                        }}
                    >
                        Courses
                    </Button>

                    <Button
                        color="inherit"
                        onClick={onLogout}
                        startIcon={<LogoutIcon />}
                        sx={{
                            textTransform: 'none',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)'
                            },
                            borderRadius: '20px',
                            px: 2,
                            fontFamily: "'Arial', sans-serif"
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
