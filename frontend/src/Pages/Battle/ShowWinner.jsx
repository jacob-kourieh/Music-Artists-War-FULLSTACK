import { useEffect, useState } from "react"
import "./Battle.css"
import { baseURL } from '../../Utils/baseURL'
import CircularProgress from '@mui/material/CircularProgress';

function ShowWinner({ close, artist }) {

    const [updatedData, setUpdatedData] = useState([])

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


    console.log(artist);




    return (
        <div className="winner-overlay-container">
            <article className=" winner-hamster-card">
                <h1 className="winner-hamster-h1">You voted for</h1>
                {
                    updatedData ?
                        <section>
                            <img className="hamster-winner-image" src={artist.imgName} alt="hamster"  ></img>
                            <h2>{artist.name}</h2>
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