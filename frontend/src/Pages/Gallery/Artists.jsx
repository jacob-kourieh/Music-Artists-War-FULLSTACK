import { useState, useEffect } from 'react'
import "../Gallery/gallery.css"
import ShowInfo from './ShowInfo'
import CircularProgress from '@mui/material/CircularProgress';
import { baseURL } from '../../Utils/baseURL'
import { BsFillTrashFill, BsFillArrowUpRightSquareFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';




function Artists() {

    const [showAddArtistOverlay, setShowAddArtistOverlay] = useState(false)
    const [artists, setArtists] = useState([])
    const [searchTerm, setSearchTerm] = useState("");


    //get fetch för att hämta alla artister fåm backend
    function getArtists() {
        fetch(`${baseURL}/artists`)
            .then((response) => response.json())
            .then((data) => setArtists(data));
    }
    useEffect(() => {
        getArtists();
    }, []);

    //Fetsh för ta bort artist från Apiet
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

    /*  const display = () => {
         setArtists(artists)
         window.location.reload();
     }
  */

    //Overlay sidan med stäng function
    let addArtistOverlay
    if (showAddArtistOverlay) {
        const closeOverlay = () => { setShowAddArtistOverlay(false); getArtists() }
        addArtistOverlay = <ShowInfo close={closeOverlay} artist={artists} />
    }



    const handleShowMore = (star) => {
        console.log('you clicked', star)
        setShowAddArtistOverlay(true)
        setArtists(star)
    }


    return (
        <section className='big-gallry-cont'>

            <div className="search-box">
                <button className="btn-search">   <AiOutlineSearch />  </button>
                <input type="text" className="input-search" placeholder="Search Artist /Nationality /Genres"
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}
                />
            </div>

            <section className="play-container">
                {artists.length > 0 && artists.length ? [...artists].reverse().filter((value) => {
                    if (searchTerm === "") {
                        return value
                    }
                    else if (value.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        value.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        value.genres.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return value
                    }

                }).map((artist, i) => {
                    return (
                        <article key={i} className="hamster-gridcard">
                            <img
                                onClick={() => { handleShowMore(artist) }}
                                className="artist-image" src={artist.imgName} alt="artist" >
                            </img>
                            <h2 className='artist-centertext'>{artist.name}</h2>


                            <article className='btn-grup'>
                                <span onClick={() => { deleteArtists(artist._id) }} > <BsFillTrashFill fontSize="1.5em" style={{ fill: '#ffffffa6', cursor: 'pointer' }} /> </span>
                                <span onClick={() => { handleShowMore(artist) }} > <BsFillArrowUpRightSquareFill fontSize="1.5em" style={{ fill: '#ffffffa6', cursor: 'pointer' }} /> </span>

                            </article>
                        </article>

                    );

                }) : <CircularProgress />

                }
                {addArtistOverlay}




            </section>
        </section>
    )

}


export default Artists;