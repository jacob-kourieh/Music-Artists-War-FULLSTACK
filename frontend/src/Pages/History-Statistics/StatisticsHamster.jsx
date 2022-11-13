import React from "react"
import { useEffect, useState } from "react";
import { baseURL } from '../../Utils/baseURL'
import "../History-Statistics/statistics.css"

function StatisticsHamster() {
    const [winners, setWinners] = useState([]);
    const [losers, setLosers] = useState([]);


    //Fetch för hämsta atister winner top 5 
    async function getWinners() {
        const response = await fetch(`${baseURL}/artists/winners`);
        setWinners(await response.json());
    }

    //Fetch för hämsta atister loser top 5 
    async function getLosers() {
        const response = await fetch(`${baseURL}/artists/losers`);
        setLosers(await response.json());
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
                        {winners.map((artistWinner, i) => (
                            <dl key={i}>
                                {/* className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')} */}
                                {/* {artistWinner.wins >= 12 ? "classname":"statistics-image" : "classname":"otline-winner"} */}

                                <dt> <img src={artistWinner.imgName} className={`statistics-image  ${artistWinner.wins >= 100 ? "otline-winner" : (artistWinner.wins >= 500 ? "otline-winner2" : "statistics-image")}`}

                                    alt="winner artist" /></dt>
                                <h2 className="stats-item-name"> {artistWinner.name}</h2>
                                <dt> {artistWinner.wins} times wins </dt>
                            </dl>
                        ))}
                    </ol>
                </article>
            </li>

            <li className="statistics-list-item">
                <h3 className="stats-header-text">Top 5 losers</h3>
                <article className="statistics-frame">
                    <ol className="statsic-cont">
                        {losers.map((artistLoser, i) => (
                            <dl key={i} >
                                <dt> <img src={artistLoser.imgName} className="statistics-image" alt="loser artist" /></dt>
                                <h2 className="stats-item-name">{artistLoser.name}</h2>
                                <dt>{artistLoser.defeats} times defeats</dt>
                            </dl>
                        ))}
                    </ol>
                </article>
            </li>

        </section>
    );
}

export default StatisticsHamster;