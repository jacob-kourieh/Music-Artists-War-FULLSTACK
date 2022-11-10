/* import { useEffect, useState } from "react"

const History = () => {


    const [matches, setMatches] = useState([])
    const [GetHamsters, setGetHamsters] = useState([])


    useEffect(() => {
        async function getMatches() {
            const response = await fetch("http://localhost:1335/matches",
                { method: 'GET' })
            const data = await response.json()
            setMatches(data)

        }
        getMatches()
    }, [])


    useEffect(() => {
        async function getTheHamsters() {
            const response = await fetch('http://localhost:1335/hamsters',
                { method: 'GET' })
            const data = await response.json()
            setGetHamsters(data)
        }
        getTheHamsters()
    }, [])


    async function deleteMatch(id) {
        window.location.reload();
        const response = await fetch(`http://localhost:1335/matches/delete/${id._id}`,
            { method: 'DELETE' })

        const data = await response.json()
        console.log(data);
        console.log('Deleted: ')



        // setMatches(matches.length > 0 && matches.filter((match) => match._id !== id))

    }


    return (
        <div>
            <h1>Hamsters History</h1>


            {matches.length > 0 && GetHamsters.length > 0 ? [...matches].reverse().mapmatches.map(match => {

                let winner = GetHamsters.find(({ id }) => { return id._id === match.winner });
                let loser = GetHamsters.find(({ _id }) => _id === match.loser);


                return (
                    <div style={{ display: "flex" }}>
                        <img src={winner && winner.imgName} alt="" width="300" height="300" />
                        <p> Winner: {winner.name} </p>
                        <img src={loser.imgName} alt="" width="300" height="300" />
                        <p>Loser: {loser.name}</p>
                        <button onClick={() => deleteMatch(match)}> Delete Match </button>
                    </div>
                )
            }) : null}

        </div>
    )

}

export default History */





import React from 'react'
import { useEffect, useState } from 'react'
import "../History-Statistics/history.css"
import CircularProgress from '@mui/material/CircularProgress';
import { FaSadCry } from 'react-icons/fa';
import { baseURL } from '../../Utils/baseURL'
import { GiPodiumWinner } from 'react-icons/gi';


const History = () => {
    const [matches, setMatches] = useState([])
    const [getArtists, setGetArtists] = useState([])
    const [updateMatches, setUpdateMatches] = useState(false)


    useEffect(() => {
        async function getMatches() {
            const response = await fetch(`${baseURL}/matches`,
                { method: 'GET' })
            const data = await response.json()
            setMatches(data)
            setUpdateMatches(false)
        }
        getMatches()
    }, [updateMatches])


    useEffect(() => {
        async function getTheArtists() {
            const response = await fetch(`${baseURL}/artists`,
                { method: 'GET' })
            const data = await response.json()
            setGetArtists(data)
        }
        getTheArtists()
    }, [])


    async function deleteAMatch(match) {
        await fetch(`${baseURL}/matches/delete/${match._id}`,
            { method: 'DELETE' })
        console.log('Deleted: ')
        setUpdateMatches(true)
    }


    return (
        <div >
            <article className="gallery-header">
                <h1 className="gallery-title"> MATCHES HISTORY</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur obcaecati cum quasi mollitia sapiente? Fuga asperiores autem perspiciatis tempora corrupti. Neque molestias, debitis alias dolorum a suscipit reprehenderit necessitatibus tempora!</p>
                <article className="btn-container">
                </article>
            </article>
            <section >
                <div className='history-Container'>
                    {matches ? matches.map(match => {
                        if (!getArtists) return 'Todo'

                        let winner = getArtists.find(({ _id }) => _id === match.winner);
                        let loser = getArtists.find(({ _id }) => _id === match.loser)
                        if (!winner) return <div className="onematch"> <button onClick={() => deleteAMatch(match)}>TA BORT MATCH</button></div>
                        if (!loser) return <div className="onematch"> <button onClick={() => deleteAMatch(match)}>TA BORT MATCH</button></div>

                        if (!loser) return 'There ane no losers'
                        return <section className='mastch-wrapper'>
                            <section className="match-items">

                                <div className="winner-history" key={match.winner}>
                                    <GiPodiumWinner fontSize="2em" style={{ fill: '#207a81' }} />
                                    <h3 className='winner-text'>THE WINNER</h3>
                                    <img src={`${winner.imgName}`} alt="Bild på hamster" className="history-image" />
                                    <h2 className='item-name'>{winner.name}</h2>
                                </div>

                                <div className="loser-history" key={match.loser}>
                                    < FaSadCry fontSize="2em" style={{ fill: '#207a81' }} />
                                    <h3 className='loser-text'>THE LOSER</h3>
                                    <img src={`${loser.imgName}`} alt="Bild på hamster" className="history-image" />
                                    <h2 className='item-name'>{loser.name}</h2>

                                </div>

                            </section>
                            <div className="buttondelete">
                                <button className="main-btn" onClick={() => deleteAMatch(match)}>DELETE MATCH</button>
                            </div>
                        </section>


                    })
                        : <CircularProgress />}

                </div>
            </section>
        </div>
    );
}

export default History
