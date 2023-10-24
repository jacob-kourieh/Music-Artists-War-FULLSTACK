import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import {
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Button,
} from '@mui/material';
import MusicPlayerSlider from './MusicPlayerSlider';

function RandomSong() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [songInfo, setSongInfo] = useState({ title: '', artist: '', albumArtUrl: '' });
    const [previewUrl, setPreviewUrl] = useState('');
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(30);
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/api/genres`);
                setGenres(data);
            } catch (error) {
                console.error('Failed to fetch genres.', error);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        if (songInfo.title && songInfo.artist) {
            checkIfFavorite();
        }
    }, [songInfo]);

    const handleRandomSongClick = async () => {
        setLoading(true);
        setShowPlayer(false);
        if (audio) {
            audio.pause();
        }
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);

        try {
            const { data } = await axios.get(`${baseURL}/api/randomsong?genreId=${selectedGenre}`);
            setSongInfo({ title: data.song, artist: data.artist, albumArtUrl: data.albumArtUrl });
            setPreviewUrl(data.previewUrl);
            const newAudio = new Audio(data.previewUrl);
            setAudio(newAudio);
        } catch (error) {
            console.error('Failed to fetch random song.', error);
        }

        setLoading(false);
        setShowPlayer(true);
    };


    const handlePlayPauseClick = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (_, newValue) => {
        const newVolume = newValue / 100;
        if (audio) {
            audio.volume = newVolume;
        }
        setVolume(newValue);
    };

    const handlePositionChange = (_, newValue) => {
        if (audio) {
            audio.currentTime = newValue;
            setPosition(newValue);
        }
    };

    const formatDuration = (value) => {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.round(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    };

    const checkIfFavorite = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        try {
            const response = await axios.get(`${baseURL}/api/user/profile/${username}`, {
                headers: { 'auth-token': token },
            });
            const favoriteSongs = response.data.favoriteSongs || [];
            const isFavorite = favoriteSongs.some(
                (song) => song.title === songInfo.title && song.artist === songInfo.artist
            );
            setIsFavorite(isFavorite);
        } catch (error) {
            console.error('Failed to fetch user profile.', error);
        }
    };

    const handleFavoriteClick = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const songData = {
            title: songInfo.title,
            artist: songInfo.artist,
            albumArtUrl: songInfo.albumArtUrl,
            previewUrl: previewUrl,
            username: username,
        };

        try {
            if (isFavorite) {
                await axios.post(`${baseURL}/api/user/profile/removeFavoriteSong`, songData, {
                    headers: { 'auth-token': token },
                });
            } else {
                await axios.post(`${baseURL}/api/user/profile/addFavoriteSong`, songData, {
                    headers: { 'auth-token': token },
                });
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Failed to update favorite songs.', error);
        }
    };

    const handleSpotifySearch = () => {
        if (!songInfo.title || !songInfo.artist) {
            console.error("Song information is missing");
            return;
        }

        const searchQuery = encodeURIComponent(`${songInfo.title} ${songInfo.artist}`);
        const searchUrl = `https://open.spotify.com/search/${searchQuery}`;
        window.open(searchUrl, "_blank");
    };

    const handleBackToSelection = () => {
        setShowPlayer(false);
        setSelectedGenre('');
    };


    return (
        <Container>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <article className="gallery-header music-app">
                    <h2 className="gallery-title margin-title">THE MUSIC</h2>
                    <p>Welcome to random song. You can try and choose the genre and then get your song. You can add the song to your favorites by logging in or registering...</p>
                </article>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && !showPlayer && (
                <>
                    <Box sx={{ width: '50%', mx: 'auto', mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="genre-select-label">Select a genre</InputLabel>
                            <Select
                                labelId="genre-select-label"
                                id="genre-select"
                                value={selectedGenre}
                                label="Select a genre"
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                {genres.map((genre) => (
                                    <MenuItem key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {selectedGenre !== null && selectedGenre !== undefined && (
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Button variant="contained" color="secondary" onClick={handleRandomSongClick}>
                                Get a random song
                            </Button>
                        </Box>
                    )}
                </>
            )}

            {previewUrl && showPlayer && (
                <MusicPlayerSlider
                    songInfo={songInfo}
                    audio={audio}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    position={position}
                    setPosition={setPosition}
                    duration={duration}
                    setDuration={setDuration}
                    volume={volume}
                    setVolume={setVolume}
                    isFavorite={isFavorite}
                    setIsFavorite={setIsFavorite}
                    handleRandomSongClick={handleRandomSongClick}
                    handlePlayPauseClick={handlePlayPauseClick}
                    handleVolumeChange={handleVolumeChange}
                    handlePositionChange={handlePositionChange}
                    formatDuration={formatDuration}
                    handleFavoriteClick={handleFavoriteClick}
                    handleSpotifySearch={handleSpotifySearch}
                    handleBackToSelection={handleBackToSelection}
                />
            )}
        </Container>
    );
}

export default RandomSong;
