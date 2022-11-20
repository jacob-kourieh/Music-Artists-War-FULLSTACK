import Battle from "./Battle";
import "./Battle.css"



const Play = () => {

    return (
        <div className="play-match-container">
            <div className="gallery-header">
                <h1 className="gallery-title"> THE GAME</h1>
                <p>The game is a match between two music artists and you vote for your favourites. The winner artist will get a win point and the losing artist will get a defeats point.</p>
                <article className="btn-container">
                </article>
            </div>
            <div className="artist-match-container">
                <Battle />
            </div>
        </div>
    )
};

export default Play