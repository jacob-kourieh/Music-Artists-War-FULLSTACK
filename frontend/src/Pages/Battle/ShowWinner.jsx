import { useEffect, useState } from "react"
import "./Battle.css"
import { baseURL } from '../../Utils/baseURL'
import CircularProgress from '@mui/material/CircularProgress';

function ShowWinner({ close, artist }) {
    const [updatedData, setUpdatedData] = useState([])

    //Hämtar artist vinnaren med hjälp av _id genom fetchen
    useEffect(() => {
        async function updatedWinner() {
            let response = await fetch(`${baseURL}/artist/${artist._id}`, {
                method: 'GET'
            })
            let data = await response.json()
            setUpdatedData(data)
        }
        updatedWinner()
    }, [])


    return (
        <div className="winner-overlay-container">
            <article>
                <h2 className="winner-artist-h2">You voted for</h2>
                {
                    updatedData ?
                        <section>
                            <img className="artist-winner-image" src={artist.imgName} alt="hamster"  ></img>
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