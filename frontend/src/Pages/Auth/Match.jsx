import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Match = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

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
    }, []);

    const deleteMatch = async (gameId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${baseURL}/api/user/profile/updateGameData`,
                { username: userData.username, gameId },
                { headers: { 'auth-token': token } });
            if (response.status === 200) {
                const updatedGameData = userData.gameData.filter(game => game.gameId !== gameId);
                setUserData(prevUserData => ({ ...prevUserData, gameData: updatedGameData }));
            }
        } catch (error) {
            console.error('Failed to update game data.', error);
        }
    };

    return (
        <Grid container spacing={3}>
            {userData?.gameData.map((game, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="div">
                                Match {index + 1}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You chose {game.chosenArtistName} over {game.loserArtistName}
                            </Typography>
                        </CardContent>
                        <IconButton
                            onClick={() => deleteMatch(game.gameId)}
                            color="secondary"
                            sx={{ alignSelf: 'flex-end', m: 1 }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Match;
