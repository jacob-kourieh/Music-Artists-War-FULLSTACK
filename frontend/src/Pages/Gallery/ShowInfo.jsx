
function ShowInfo({ close, artist }) {

    //visa artist info kortet via porpsen (artist)

    return (
        <div className="overlay artist-overlay">
            <div className="artist-overlay-dialog">
                <img className="overlay-artist-image" src={artist.imgName} alt="artistImage"></img>
                <div>
                    <div className="overlay-information-box">
                        <h2>{artist.name}</h2>
                        <p> Age: {artist.age} years</p>
                        <p> Nationality: {artist.nationality}</p>
                        <p> Genres: {artist.genres}</p>

                    </div>
                    <h3>Match history</h3>
                    <div className="match-history">
                        <span>Wins: <span className="match-points"> {artist.wins}</span> </span>
                        <span>Games: <span className="match-points"> {artist.games} </span></span>
                        <span>Defeats: <span className="match-points"> {artist.defeats}</span></span>

                    </div>
                </div>
                <button className="close-btn" onClick={close}>X</button>
            </div>
        </div>
    )
}

export default ShowInfo;