import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Image, BarChart, History, Dashboard, Audiotrack, LocalFireDepartment } from '@mui/icons-material';


function Header() {
    const [value, setValue] = useState('home');

    const menuItems = [
        { label: 'Home', icon: Home, link: '/', value: 'home' },
        { label: 'Play', icon: LocalFireDepartment, link: '/play', value: 'play' },
        { label: 'Music', icon: Audiotrack, link: '/randomsong', value: 'music' },
        { label: 'Gallery', icon: Image, link: '/gallery', value: 'gallery' },
        { label: 'Statistics', icon: BarChart, link: '/statistics', value: 'statistics' },
        { label: 'History', icon: History, link: '/history', value: 'history' },
        { label: 'Dashboard', icon: Dashboard, link: '/dashboard', value: 'dashboard' },

    ];

    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgb(24, 93, 98)' }}>
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', textDecoration: 'none', color: 'white', ml: 2 }}
                >
                    <div className="greeting brand">
                        <p>MUSIC</p>
                        <p>ARTISTS</p>
                        <p>WAR</p>
                    </div>
                </Typography>

                <Box sx={{ flexGrow: 0, width: { xs: '100%', md: 'auto' } }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        sx={{ backgroundColor: 'transparent', justifyContent: { xs: 'center', md: 'flex-start' } }}
                    >
                        {menuItems.map((item) => (
                            <BottomNavigationAction
                                key={item.value}
                                label={item.label}
                                icon={React.createElement(item.icon)}
                                component={Link}
                                to={item.link}
                                value={item.value}
                                sx={{
                                    color: 'white',
                                    '&.Mui-selected': {
                                        color: '#96f58d',
                                    },
                                    '& .MuiBottomNavigationAction-label': {
                                        fontSize: { xs: '0.7rem', md: '0.875rem' },
                                    },
                                    '& .MuiSvgIcon-root': {
                                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                                    },
                                    padding: { xs: '6px 4px', md: '6px 12px' },
                                    minWidth: { xs: 50, md: 80 },
                                }}
                            />
                        ))}
                    </BottomNavigation>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;




