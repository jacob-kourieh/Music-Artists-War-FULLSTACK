import React from "react"
import { useEffect, useState } from "react";
import { baseURL } from '../../Utils/baseURL'
import "../History-Statistics/statistics.css"
import CircularProgress from '@mui/material/CircularProgress';

function Statistics() {
    const [winners, setWinners] = useState([]);
    const [losers, setLosers] = useState([]);
    const [loadingWinners, setLoadingWinners] = useState(true);
    const [loadingLosers, setLoadingLosers] = useState(true);


    //Fetch för hämsta atister winner top 5 
    async function getWinners() {
        const response = await fetch(`${baseURL}/artists/winners`);
        setWinners(await response.json());
        setLoadingWinners(false);
    }

    //Fetch för hämsta atister loser top 5 
    async function getLosers() {
        const response = await fetch(`${baseURL}/artists/losers`);
        setLosers(await response.json());
        setLoadingLosers(false);
    }

    useEffect(() => {
        getWinners();
        getLosers();
    }, []);


    function topp() {
        if (winners.wins >= 13) {

        }
    }

    return (
        <section className="statistics-container">
            <li className="statistics-list-item">
                <h3 className="stats-header-text">Top 5 winners</h3>
                <article className="statistics-frame">
                    <ol className="statsic-cont">
                        {loadingWinners ? <CircularProgress /> : winners.map((artistWinner, i) => (
                            <dl key={i}>
                                {/* className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')} */}
                                {/* {artistWinner.wins >= 12 ? "classname":"statistics-image" : "classname":"otline-winner"} */}

                                <dt> <img src={artistWinner.imgName} className={`statistics-image  ${artistWinner.wins >= 100 ? "otline-winner" : (artistWinner.wins >= 500 ? "otline-winner2" : "statistics-image")}`}

                                    alt="winner artist" /></dt>
                                <h2 className="stats-item-name"> {artistWinner.name}</h2>
                                <dt> <span className="statistic-num-result">{artistWinner.wins}</span> times wins </dt>
                            </dl>
                        ))}
                    </ol>
                </article>
            </li>

            <li className="statistics-list-item">
                <h3 className="stats-header-text">Top 5 losers</h3>
                <article className="statistics-frame">
                    <ol className="statsic-cont">
                        {loadingLosers ? <CircularProgress /> : losers.map((artistLoser, i) => (
                            <dl key={i} >
                                <dt> <img src={artistLoser.imgName} className="statistics-image" alt="loser artist" /></dt>
                                <h2 className="stats-item-name">{artistLoser.name}</h2>
                                <dt> <span className="statistic-num-result">{artistLoser.defeats}</span> times defeats</dt>
                            </dl>
                        ))}
                    </ol>
                </article>
            </li>

        </section>
    );
}

export default Statistics;