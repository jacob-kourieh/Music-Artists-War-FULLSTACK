import { useEffect, useState } from 'react'
import ShowWinner from './ShowWinner'
import { baseURL } from '../../Utils/baseURL'
import "./Battle.css"
import CircularProgress from '@mui/material/CircularProgress';




function Battle() {
    const [artists, setArtists] = useState([])

    let [winner, setWinner] = useState([])
    let [loser, setLoser] = useState([])
    const [match, setMatch] = useState([])

    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState(false)

    const getRandomArtists = () => {
        //Hämtar data genom fetch
        fetch(`${baseURL}/artists/random`)
            .then(res => res.json())
            .then(data => setArtists(data))
    }

    useEffect(() => {
        getRandomArtists(setArtists)
    }, [])


    const newGame = () => {
        getRandomArtists(setArtists)
        setWinner()
        setLoser()
    }


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

    /* useEffect(() => {
        setWinner(winner)
        setLoser(loser)
    }, []) */


    //POST match(winner och loser i matchobjekt)
    async function postMatch(winner, loser) {
        const response = await fetch(`${baseURL}/matches`, {
            method: 'POST',
            body: JSON.stringify({ 'winner': winner._id, 'loser': loser._id }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.text();
        console.log('match data is: ' + data);

        //setMatch([...hamsters]);
        setMatch({ "winner": winner._id, "loser": loser._id })
        console.log('winner is: ' + winner.name + ' loser is ' + loser.name);
        console.log('match is ' + match);
    }


    async function handleCutestClick(win, lose) {
        await updateWinner(win)
        await updateLoser(lose)
        await postMatch(win, lose)
        setShowAddHamsterOverlay(true)
        //let ham =   hamsters.filter(ham => ham !== hamsters)[0]
    }



    //kopplar till SHOWINNER component med props{winner} 
    let addHamsterOverlay
    if (showAddHamsterOverlay) {
        const closeOverlay = () => { setShowAddHamsterOverlay(false); newGame() }
        addHamsterOverlay = <ShowWinner close={closeOverlay} artist={winner} />
    }


    /*  const newBattle = () => {
         window.location.reload();
     } */


    /*  const handleClick = event => {
         event.currentTarget.disabled = true;
         console.log('button clicked');
     }; */

    return (
        <div className="play-container">
            {artists ? artists.map((artist, i) => (

                <article key={i} className="hamster-card hamster-match-card">
                    <div >
                        <img alt="hamster" src={artist.imgName} className="contestant-hamster-img"></img>
                        <h2 className='item-name'>{artist.name}</h2>
                    </div>
                    <div>
                        <button
                            className="main-btn vote-btn"
                            onClick={() => { handleCutestClick(artist, artists?.filter(ham => ham !== artist)[0]) }}>
                            VOTE
                        </button>

                    </div>
                </article>
            )) : <CircularProgress />
            }

            <h1 className="vs-string"> VS.</h1>
            {addHamsterOverlay}
        </div>


    )


}

export default Battle







//POST match(winner och loser i matchobjekt)
/* async function postMatch(winner, loser) {
    const response = await fetch("http://localhost:1333/matches", {
        method: 'POST',
        body: JSON.stringify({ winner: winner, loser: loser }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.text();
    console.log('match data is: ' + data);

    //setMatch([...hamsters]);
    setMatch({ "winnerId": winner, "loserId": loser })
    console.log('winner is: ' + winner.name + ' loser is ' + loser.name);
    console.log('match is ' + match);
} */
