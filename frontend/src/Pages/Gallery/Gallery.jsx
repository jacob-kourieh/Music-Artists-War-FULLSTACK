import { useState } from "react"
import "../Gallery/gallery.css"
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
                <h1 className="gallery-title"> Gallery</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur obcaecati cum quasi mollitia sapiente? Fuga asperiores autem perspiciatis tempora corrupti. Neque molestias, debitis alias dolorum a suscipit reprehenderit necessitatibus tempora!</p>
                <article className="btn-container">
                    <button className="main-btn" onClick={showOverlay}>Add artist</button>
                    <Link to="/play"><button className="main-btn" >Play Agien</button></Link>
                </article>
            </article>




            <article className="gallery-container">
                <Artists />
                {addArtistOverlay}
            </article>
        </section>
    )
}

export default Gallery