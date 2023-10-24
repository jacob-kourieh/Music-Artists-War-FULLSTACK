import { useEffect, useState } from "react"
import { baseURL } from '../../Utils/baseURL'
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import axios from "axios";

function ShowWinner({ close, artist }) {
    const [updatedData, setUpdatedData] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)

    //Hämtar artist vinnaren med hjälp av _id genom fetchen
    useEffect(() => {
        async function updatedWinner() {
            let response = await fetch(`${baseURL}/artist/${artist._id}`, {
                method: 'GET'
            })
            let data = await response.json()
            setUpdatedData(data)

            if (localStorage.getItem('token')) {
                const username = localStorage.getItem('username');
                const token = localStorage.getItem('token');

                const profileResponse = await axios.get(`${baseURL}/api/user/profile/${username}`,
                    { headers: { 'auth-token': token } }
                );

                if (profileResponse.status === 200) {
                    const favoriteArtistIds = profileResponse.data.favoriteArtists.map(artist => artist._id);
                    setIsFavorite(favoriteArtistIds.includes(artist._id));
                }
            }
        }
        updatedWinner()
    }, [])


    async function handleFavoriteClick(artist) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        try {
            const response = await axios.post(`${baseURL}/api/user/profile/updateFavoriteArtists`,
                { username, artistId: artist._id, action: isFavorite ? 'remove' : 'add' },
                { headers: { 'auth-token': token } }
            );
            if (response.status === 200) {
                console.log('Favorites updated successfully');
                setIsFavorite(!isFavorite);
            }
        } catch (error) {
            console.error('Failed to update favorite artists.', error);
        }
    }

    return (
        <div className="winner-overlay-container">
            <article>
                <h2 className="winner-artist-h2">You voted for</h2>
                {
                    updatedData ?
                        <section>
                            <div style={{ position: "relative" }}>
                                <img className="artist-winner-image" src={artist.imgName} alt="artistImage"></img>
                                {localStorage.getItem('token') && <FavoriteOutlinedIcon className={`favorite-icon ${isFavorite ? 'active' : ''}`} sx={{ fontSize: 55 }} onClick={() => handleFavoriteClick(updatedData)} />}

                            </div>
                            <h2 className="artist-winner-name">{artist.name}</h2>
                            <div className="match-history">
                                <h4>Match history</h4>
                                <span>Games: <span className="match-points"> {updatedData.games} </span></span>
                                <span>Wins: <span className="match-points"> {updatedData.wins}</span> </span>
                                <span>Defeats: <span className="match-points"> {updatedData.defeats}</span></span>
                            </div>
                        </section>
                        : <CircularProgress />
                }
                <button className="main-btn" onClick={close}> New Game </button>
            </article>
        </div>
    )
}

export default ShowWinner
