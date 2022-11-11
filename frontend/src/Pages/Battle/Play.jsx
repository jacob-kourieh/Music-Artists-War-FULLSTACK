import Battle from "./Battle";
import "./Battle.css"



const Play = () => {

    return (
        <div className="play-match-container">
            <div className="gallery-header">
                <h1 className="gallery-title"> THE GAME</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum saepe, doloremque mollitia soluta ex quis quae a cum nulla eaque natus impedit deleniti ipsum eius error, quo voluptas dolorem delectus?.</p>
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