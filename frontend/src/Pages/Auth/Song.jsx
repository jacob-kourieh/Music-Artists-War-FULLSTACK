import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const Song = () => {
    const [userData, setUserData] = useState(null);
    const [playingSong, setPlayingSong] = useState(null);
    const [audio, setAudio] = useState(null);

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

    const playPauseHandler = (previewUrl, title) => {
        if (audio) {
            audio.pause();
        }

        if (playingSong === title) {
            setPlayingSong(null);
            return;
        }

        const newAudio = new Audio(previewUrl);
        newAudio.play();
        setAudio(newAudio);
        setPlayingSong(title);
    };

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, [audio]);

    const removeFavoriteSong = async (title) => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        try {
            const response = await axios.post(`${baseURL}/api/user/profile/removeFavoriteSong`,
                { username, title },
                { headers: { 'auth-token': token } }
            );
            if (response.status === 200) {
                const updatedFavoriteSongs = userData.favoriteSongs.filter(song => song.title !== title);
                setUserData(prevUserData => ({ ...prevUserData, favoriteSongs: updatedFavoriteSongs }));
            }
        } catch (error) {
            console.error('Failed to update favorite songs.', error);
        }
    };

    return (
        <Grid container spacing={3}>
            {userData?.favoriteSongs.map((song, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            sx={{ height: 220, objectFit: 'cover' }}
                            image={song.albumArtUrl}
                            alt={song.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="div" noWrap>
                                {song.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {song.artist}
                            </Typography>
                        </CardContent>
                        <Box textAlign="right" p={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IconButton onClick={() => playPauseHandler(song.previewUrl, song.title)} color="secondary">
                                {playingSong === song.title ? <PauseCircleIcon sx={{ fontSize: 30 }} /> : <PlayCircleIcon sx={{ fontSize: 30 }} />}
                            </IconButton>
                            <IconButton onClick={() => removeFavoriteSong(song.title)} color="secondary">
                                <DeleteIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Song;
