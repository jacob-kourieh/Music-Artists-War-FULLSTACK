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


    //Get fetch för hämtas matches från backend
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



    //Fetch för att hämta alla artister
    useEffect(() => {
        async function getTheArtists() {
            const response = await fetch(`${baseURL}/artists`,
                { method: 'GET' })
            const data = await response.json()
            setGetArtists(data)
        }
        getTheArtists()
    }, [])


    // Fetch för ta bort en match från Apiet via _id
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

                        // Ska jämföra om idet på matchen är samma idete på artists då ska vi kunna lägga artists namn och bildrna på history match.
                        let winner = getArtists.find(({ _id }) => _id === match.winner);
                        let loser = getArtists.find(({ _id }) => _id === match.loser)
                        if (!winner) return <div className="onematch"> <button onClick={() => deleteAMatch(match)}>DELETE MATCH</button></div>
                        if (!loser) return <div className="onematch"> <button onClick={() => deleteAMatch(match)}>DELETE MATCH</button></div>

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
