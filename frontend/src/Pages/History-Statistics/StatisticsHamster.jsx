import React from "react"
import { useEffect, useState } from "react";
import "../History-Statistics/statistics.css"


function StatisticsHamster() {
    const [winners, setWinners] = useState([]);
    const [losers, setLosers] = useState([]);

    async function getWinners() {
        const response = await fetch("http://localhost:1335/artists/winners");
        setWinners(await response.json());
    }
    async function getLosers() {
        const response = await fetch("http://localhost:1335/artists/losers");
        setLosers(await response.json());
    }

    useEffect(() => {
        getWinners();
        getLosers();
    }, []);

    return (
        <section className="statistics-container">

            <li className="statistics-list-item">
                <h3 className="stats-header-text">Top 5 Artists winners</h3>
                <article className="statistics-frame">
                    <ol className="statsic-cont">
                        {winners.map((artistWinner, i) => (
                            <dl key={i}>
                                <dt>  <img src={artistWinner.imgName} className="statistics-image" alt="winner hamster" /></dt>
                                <h2 className="stats-item-name"> {artistWinner.name}</h2>
                                <dt> {artistWinner.wins} times wins </dt>
                            </dl>
                        ))}
                    </ol>
                </article>
            </li>



            <li className="statistics-list-item">
                <h3 className="stats-header-text">Top 5 Artists losers</h3>
                <article className="statistics-frame">
                    <ol className="statsic-cont">
                        {losers.map((artistLoser, i) => (
                            <dl key={i} >
                                <dt> <img src={artistLoser.imgName} className="statistics-image" alt="loser hamster" /></dt>
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