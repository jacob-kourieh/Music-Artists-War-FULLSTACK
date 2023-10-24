import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import './auth.css';
import { baseURL } from '../../Utils/baseURL';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Artist = () => {
    const [userData, setUserData] = useState(null);
    const [favoriteArtistsData, setFavoriteArtistsData] = useState([]);

    const fetchArtist = async (game) => {
        const response = await axios.get(`${baseURL}/artist/${game._id}`);
        return response.data;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            try {
                const response = await axios.get(`${baseURL}/api/user/profile/${username}`, {
                    headers: { 'auth-token': token },
                });
                setUserData(response.data);
                const artistsData = await Promise.all(response.data.favoriteArtists.map(fetchArtist));
                setFavoriteArtistsData(artistsData);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch user data.');
            }
        };
        fetchUserData();
    }, []);

    const removeFavoriteArtist = async (artistId) => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        try {
            const response = await axios.post(`${baseURL}/api/user/profile/updateFavoriteArtists`,
                { username, artistId, action: 'remove' },
                { headers: { 'auth-token': token } });
            if (response.status === 200) {
                const updatedFavoriteArtists = userData.favoriteArtists.filter(id => id !== artistId);
                setUserData(prevUserData => ({ ...prevUserData, favoriteArtists: updatedFavoriteArtists }));
                const updatedFavoriteArtistsData = favoriteArtistsData.filter(artist => artist._id !== artistId);
                setFavoriteArtistsData(updatedFavoriteArtistsData);
            }
        } catch (error) {
            console.error('Failed to update favorite artists.', error);
        }
    };

    return (
        <Grid container spacing={3}>
            {favoriteArtistsData.map((artist, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            sx={{ height: 280, objectFit: 'cover' }}
                            image={artist.imgName}
                            alt={artist.name}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="div" noWrap>
                                {artist.name}
                            </Typography>
                        </CardContent>
                        <IconButton
                            onClick={() => removeFavoriteArtist(artist._id)}
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

export default Artist;
