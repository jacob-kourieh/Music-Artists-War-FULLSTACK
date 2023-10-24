import { useEffect, useState } from 'react'
import ShowWinner from './ShowWinner'
import { baseURL } from '../../Utils/baseURL'
import CircularProgress from '@mui/material/CircularProgress';


function Battle() {
    const [artists, setArtists] = useState([])
    const [loading, setLoading] = useState(true)

    let [winner, setWinner] = useState([])
    let [loser, setLoser] = useState([])
    const [match, setMatch] = useState([])

    const [showAddArtistOverlay, setShowAddArtistOverlay] = useState(false)

    const [favoriteArtists, setFavoriteArtists] = useState([]);



    //get random på 2 st artister genom fetch
    const getRandomArtists = () => {
        fetch(`${baseURL}/artists/random`)
            .then(res => res.json())
            .then(data => {
                setArtists(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getRandomArtists(setArtists)
    }, [])


    const newGame = () => {
        setLoading(true)
        getRandomArtists(setArtists)
        setWinner()
        setLoser()
    }

    //Uptadera apiet med PUT +1 wins och games på artists objekt
    async function updateWinner(winner) {
        await fetch(`${baseURL}/artists/` + winner._id,
            {
                method: 'PUT',
                body: JSON.stringify({
                    'wins': winner.wins + 1,
                    'games': winner.games + 1,
                    'defeats': winner.defeats
                }),
                headers: { 'Content-Type': 'application/json' }
            })
        setWinner(winner)
    }

    //Uptadera apiet med PUT +1 defeats och games på artists objekt
    async function updateLoser(loser) {
        await fetch(`${baseURL}/artists/` + loser._id,
            {
                method: 'PUT',
                body: JSON.stringify({
                    'defeats': loser.defeats + 1,
                    'games': loser.games + 1,
                    'wins': loser.wins
                }),
                headers: { 'content-type': 'application/json' },
            })
        setLoser(loser)
    }


    //POST match(winner-id och loser-id i matchobjekt för att hämta data sen
    async function postMatch(winner, loser) {
        const response = await fetch(`${baseURL}/matches`, {
            method: 'POST',
            body: JSON.stringify({ 'winner': winner._id, 'loser': loser._id }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.text();
        console.log('match data is: ' + data);

        setMatch({ "winner": winner._id, "loser": loser._id })
        console.log('winner is: ' + winner.name + ' loser is ' + loser.name);
        console.log('match is ' + match);
    }


    async function handleCutestClick(win, lose) {
        await updateWinner(win)
        await updateLoser(lose)
        await postMatch(win, lose)

        // new code to save match data
        const token = localStorage.getItem('token');

        if (token) {
            await fetch(`${baseURL}/game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    gameId: match._id,
                    chosenArtistName: win.name,
                    loserArtistName: lose.name
                })
            });
        }

        setShowAddArtistOverlay(true)
    }



    //Winner artist Overlay sidan
    let addArtistOverlay
    if (showAddArtistOverlay) {
        const closeOverlay = () => { setShowAddArtistOverlay(false); newGame() }
        addArtistOverlay = <ShowWinner close={closeOverlay} artist={winner} />
    }

    const handleFavoriteClick = (artist) => {
        setFavoriteArtists([...favoriteArtists, artist])
    }


    return (
        <div className="play-container">
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                    <p>Please wait to load the artists game from API...</p>
                </div>
            ) : (
                <>
                    {artists.map((artist, i) => (
                        <article key={i} className=" artist-match-card">
                            <div>
                                <img alt="artist" src={artist.imgName} className="contestant-artist-img"></img>
                                <h2 className='item-name'>{artist.name}</h2>
                            </div>
                            <div>
                                <button
                                    className="main-btn vote-btn"
                                    onClick={() => { handleCutestClick(artist, artists.filter(art => art !== artist)[0]) }}>
                                    Vote
                                </button>
                            </div>
                        </article>
                    ))}
                    <h1 className="vs-string"> VS.</h1>
                </>
            )}
            {showAddArtistOverlay && addArtistOverlay}
        </div>
    )
}

export default Battle