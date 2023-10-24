import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import Artist from './Artist';
import Match from './Match';
import Song from './Song';
import { Button, ButtonGroup, Typography, Container, Box } from '@mui/material';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (!username) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get(`${baseURL}/api/user/profile/${username}`, {
                    headers: { 'auth-token': token },
                });
                setUserData(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch user data.');
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <Container maxWidth="md">
            <Box mt={3} textAlign="center">
                <Typography variant="h3" gutterBottom>
                    My Dashboard
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Welcome, {userData?.username}
                </Typography>
            </Box>
            <Box mt={2} mb={3} textAlign="center">
                <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                    <Button onClick={() => setSelectedComponent("Match")}>Matches</Button>
                    <Button onClick={() => setSelectedComponent("Artist")}>Artists</Button>
                    <Button onClick={() => setSelectedComponent("Song")}>Songs</Button>
                </ButtonGroup>
            </Box>
            <Box mt={3}>
                {selectedComponent === "Artist" && <Artist />}
                {selectedComponent === "Match" && <Match />}
                {selectedComponent === "Song" && <Song />}
            </Box>
            <Box mt={3} textAlign="center">
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Log Out
                </Button>
            </Box>
        </Container>
    );
}

export default Dashboard;
