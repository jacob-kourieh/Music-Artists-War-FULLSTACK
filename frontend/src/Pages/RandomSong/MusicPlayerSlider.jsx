import React, { useEffect } from 'react';
import { Box, Slider, IconButton, Typography, styled, Tooltip } from '@mui/material';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

library.add(faSpotify);

const PlayerContainer = styled(Box)(({ theme }) => ({
    borderRadius: 16,
    width: 420,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
    padding: theme.spacing(2),
}));

const CoverImage = styled(Box)({
    width: 200,
    height: 200,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginRight: 16,
    '& > img': {
        width: '100%',
    },
    '@media (max-width: 600px)': {
        width: 120,
        height: 120,
    },
});

const TextWithTooltip = ({ text, variant }) => (
    <Tooltip title={text} placement="top" arrow>
        <Typography noWrap variant={variant}>
            <b>{text}</b>
        </Typography>
    </Tooltip>
);

function MusicPlayerSlider({
    songInfo,
    audio,
    isPlaying,
    setIsPlaying,
    position,
    setPosition,
    duration,
    setDuration,
    volume,
    setVolume,
    isFavorite,
    setIsFavorite,
    handleRandomSongClick,
    handlePlayPauseClick,
    handleVolumeChange,
    handlePositionChange,
    formatDuration,
    handleFavoriteClick,
    handleSpotifySearch,
    handleBackToSelection,
}) {
    useEffect(() => {
        if (audio) {
            audio.ontimeupdate = () => {
                setPosition(audio.currentTime);
                setDuration(audio.duration || 0);
            };

            audio.onended = () => {
                setIsPlaying(false);
                setPosition(0);
            };

            audio.onvolumechange = () => {
                setVolume(audio.volume * 100);
            };
        }

        return () => {
            if (audio) {
                audio.pause();
                audio.ontimeupdate = null;
                audio.onended = null;
                audio.onvolumechange = null;
            }
        };
    }, [audio, setIsPlaying, setPosition, setDuration, setVolume]);

    return (
        <PlayerContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CoverImage>
                    <img alt={songInfo.title} src={songInfo.albumArtUrl} />
                </CoverImage>
                <Box sx={{ minWidth: 0 }}>
                    <TextWithTooltip text={songInfo.title} variant="h6" />
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
                        {songInfo.artist}
                    </Typography>

                </Box>
            </Box>
            <Slider
                color="secondary"
                aria-label="time-indicator"
                size="small"
                value={position}
                min={0}
                step={1}
                max={duration}
                onChange={handlePositionChange}
                sx={{ height: 4, p: 0, '& .MuiSlider-thumb': { width: 8, height: 8 }, '& .MuiSlider-rail': { opacity: 0.28 } }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Typography variant="body2" color="text.secondary">{formatDuration(position)}</Typography>
                <Typography variant="body2" color="text.secondary">-{formatDuration(duration - position)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', mb: 5, mt: 3 }}>
                <IconButton onClick={handleFavoriteClick} color="secondary">
                    {isFavorite ? <FavoriteIcon fontSize="large" sx={{ color: 'red' }} /> : <FavoriteBorderIcon fontSize="large" />}
                </IconButton>

                <IconButton onClick={handleRandomSongClick} color="secondary">
                    <ReplayOutlinedIcon fontSize="large" />
                </IconButton>

                <IconButton onClick={handlePlayPauseClick} color="secondary">
                    {isPlaying ? <PauseRounded fontSize="large" /> : <PlayArrowRounded fontSize="large" />}
                </IconButton>

                <IconButton onClick={handleSpotifySearch} color="secondary">
                    <FontAwesomeIcon icon={['fab', 'spotify']} size="lg" />
                </IconButton>

                <IconButton onClick={handleBackToSelection} color="secondary">
                    <QueueMusicIcon fontSize="large" />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <VolumeDownRounded sx={{ color: '#00000078' }} onClick={() => handleVolumeChange(null, Math.max(volume - 10, 0))} />
                <Slider
                    aria-label="Volume"
                    value={volume}
                    onChange={handleVolumeChange}
                    color="secondary"
                    sx={{ mx: 1, '& .MuiSlider-track': { border: 'none' }, '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#fff' } }}
                />
                <VolumeUpRounded sx={{ color: '#00000078' }} onClick={() => handleVolumeChange(null, Math.min(volume + 10, 100))} />
            </Box>
        </PlayerContainer>
    );
}

export default MusicPlayerSlider;
