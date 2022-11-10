
import { useState } from "react"
import "../Gallery/gallery.css"
import Hamsters from "./Hamster"
import AddNew from "./AddNew"
import { Link } from "react-router-dom"



function Gallery() {

    const [showOverlayItem, setShowOverlayItem] = useState(false)


    let addHamsterOverlay
    if (showOverlayItem) {
        const closeOverlay = () => setShowOverlayItem(false);
        addHamsterOverlay = <AddNew close={closeOverlay} />
    }

    const showOverlay = () => {
        // visa overlay
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
                <Hamsters />
                {addHamsterOverlay}
            </article>
        </section>
    )
}

export default Gallery