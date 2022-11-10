import { useState, useEffect } from 'react'
import "../Gallery/gallery.css"
import ShowInfo from './ShowInfo'
import CircularProgress from '@mui/material/CircularProgress';
import { baseURL } from '../../Utils/baseURL'
import { BsFillTrashFill, BsFillArrowUpRightSquareFill } from 'react-icons/bs';




function Hamsters() {

    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState(false)
    const [artists, setArtists] = useState([])


    //fetch
    function getArtists() {
        fetch(`${baseURL}/artists`)
            .then((response) => response.json())
            .then((data) => setArtists(data));
    }
    useEffect(() => {
        getArtists();
    }, []);

    //Delete hamster in api
    async function deleteArtists(id) {
        const response = await fetch(
            `${baseURL}/artist/delete/` + id,
            {
                method: "DELETE",
            }
        );
        const data = await response.text();
        setArtists((artists) =>
            artists.filter((artists) => artists._id !== id)
        );
    }


    const display = () => {
        setArtists(artists)
        window.location.reload();
    }


    //Overlay
    let addHamsterOverlay
    if (showAddHamsterOverlay) {
        const closeOverlay = () => { setShowAddHamsterOverlay(false); display() }
        addHamsterOverlay = <ShowInfo close={closeOverlay} artist={artists} />
    }

    const handleShowMore = (star) => {
        console.log('you clicked', star)
        setShowAddHamsterOverlay(true)
        setArtists(star)
    }




    return (
        <section className="play-container">
            {artists.length > 0 && artists.length ? [...artists].reverse().map((artist, i) => {
                return (
                    <article key={i} className="hamster-gridcard">
                        <img
                            onClick={() => { handleShowMore(artist) }}
                            className="hamster-image" src={artist.imgName} alt="hamster" >
                        </img>
                        <h2 className='hamster-centertext'>{artist.name}</h2>


                        <article className='btn-grup'>
                            <span onClick={() => { deleteArtists(artist._id) }} > <BsFillTrashFill fontSize="1.5em" style={{ fill: '#ffffffa6', cursor: 'pointer' }} /> </span>
                            <span onClick={() => { handleShowMore(artist) }} > <BsFillArrowUpRightSquareFill fontSize="1.5em" style={{ fill: '#ffffffa6', cursor: 'pointer' }} /> </span>

                        </article>
                    </article>

                );

            }) : <CircularProgress />

            }
            {addHamsterOverlay}




        </section>
    )



}



export default Hamsters;