import { useState } from "react"
import Artists from "./Artists"
import AddNew from "./AddNew"
import { Link } from "react-router-dom"


function Gallery() {

    const [showOverlayItem, setShowOverlayItem] = useState(false)

    //Overlay sidan med stäng function
    let addArtistOverlay
    if (showOverlayItem) {
        const closeOverlay = () => setShowOverlayItem(false);
        addArtistOverlay = <AddNew close={closeOverlay} />
    }

    // visa overlay siadan
    const showOverlay = () => {
        setShowOverlayItem(true)
    }

    return (
        <section>
            <article className="gallery-header">
                <h1 className="gallery-title margin-tittle"> Gallery</h1>
                <p>In the gallery you can see all artists participating in the game and can click on artists' pictures to see more information about them. You can also use the search function to search for artist name, artist nationality or artist genres.</p>
                <article className="btn-container">
                    <button className="main-btn" onClick={showOverlay}>Add artist</button>
                    <Link to="/play"><button className="main-btn" >Play Agien</button></Link>
                </article>
            </article>

            <article className="gallery-container ">
                <Artists />
                {addArtistOverlay}
            </article>
        </section>
    )
}

export default Gallery