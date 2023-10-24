import { useState } from 'react'
import FileBase64 from "react-file-base64"
import { baseURL } from '../../Utils/baseURL'


const AddNew = ({ close }) => {

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [imgName, setImgName] = useState('')
    const [nationality, setNationality] = useState('')
    const [genres, setGenres] = useState('')

    const [clickedField, setClickField] = useState(false)
    const [ageClicked, setAgeClicked] = useState(false)
    const [nationClicked, setNationClicked] = useState(false)
    const [genresClicked, setGenresClicked] = useState(false)
    const [imgClicked, setImgClicked] = useState(false)


    //onChanges 
    const onNameChange = e => {
        setName(e.target.value)
        setClickField(true)
    }
    const onAgeChange = e => {
        setAge(e.target.value)
        setAgeClicked(true)
    }

    const onNationChange = e => {
        setNationality(e.target.value)
        setNationClicked(true)
    }
    const onGenresChange = e => {
        setGenres(e.target.value)
        setGenresClicked(true)
    }
    const onImgChange = e => {
        setImgName(e.target.value)
        setImgClicked(true)
    }


    //Valideringar
    const nameIsValid = isValidName(name)
    const ageIsValid = isValidAge(age)
    const nationIsValid = isValidNation(nationality)
    const genresIsValid = isValidGenres(genres)
    const formIsValid = nameIsValid && ageIsValid && nationIsValid && genresIsValid


    //skapa functions
    function isValidName(name) {
        // console.log(name)
        return name.length >= 2
    }

    function isValidAge(age) {
        if (age <= 0) return false
        let ageString = (age)
        if (ageString.includes(',') || ageString.includes('.')) return false
        return true
    }

    function isValidNation(nation) {
        return nation.length >= 2
    }

    function isValidGenres(genre) {
        return genre.length >= 2
    }

    //Det ska skickas till med post
    const artistsData = {
        name: name,
        age: age,
        imgName: imgName,
        nationality: nationality,
        genres: genres,
        games: 0,
        wins: 0,
        defeats: 0
    }


    //Ska lägga till en ny artist genom fetchen
    const addNewArtist = async () => {
        await fetch(`${baseURL}/artist`,
            {
                method: 'POST',
                headers: { Accept: 'application/json', "Content-Type": "application/json" },
                body: JSON.stringify(artistsData)
            })
        window.location.reload();
    }


    return (
        <div className="overlay">
            <div className="dialog">
                <h2>Add a new Artist</h2>
                <form>
                    <label htmlFor="name">Write a name</label>
                    <input
                        className={nameIsValid ? 'valid' : 'invalid'}
                        id="name"
                        type="text"
                        placeholder="Write a name"
                        value={name}
                        onChange={onNameChange}
                    />
                    {!nameIsValid && clickedField ?
                        <span className="input-alert"> Name must be atleast 2 signs.</span>
                        : null
                    }
                    <label htmlFor="age">Add age</label>
                    <input
                        className={ageIsValid ? 'valid' : 'invalid'}
                        id="age"
                        type="number"
                        placeholder="Insert age"
                        value={age}
                        onChange={onAgeChange}
                    />
                    {!ageIsValid && ageClicked ?
                        <span className="input-alert"> Age must be a number and higher than 0.</span>
                        : null
                    }
                    <label htmlFor="nationality">Add a nationality</label>
                    <input
                        className={nationIsValid ? 'valid' : 'invalid'}
                        id="nationality"
                        type="text"
                        placeholder="Nationality"
                        value={nationality}
                        onChange={onNationChange}
                    />
                    {!nationIsValid && nationClicked ?
                        <span className="input-alert"> Nationality must be atleast 2 signs.</span>
                        : null
                    }
                    <label htmlFor="genres">Add a genres of music</label>
                    <input
                        className={genresIsValid ? 'valid' : 'invalid'}
                        id="genres"
                        type="text"
                        placeholder="genres of music"
                        value={genres}
                        onChange={onGenresChange}
                    />
                    {!genresIsValid && genresClicked ?
                        <span className="input-alert"> Loves must be atleast 2 signs.</span>
                        : null
                    }

                    <label htmlFor="imgName">Image URL</label>
                    <input
                        className={genresIsValid ? 'valid' : 'invalid'}
                        id="imgName"
                        type="text"
                        placeholder="Past Image URL..."
                        value={imgName}
                        onChange={onImgChange}
                    />

                    <label htmlFor="imgName">Upload a Image:</label>
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => setImgName(base64)}
                    />

                </form>
                <div>
                    <button className="main-btn" disabled={!formIsValid} onClick={(e) => { addNewArtist(); close(); e.preventDefault() }}> Add a music artist </button>
                    <button className="close-btn" onClick={close}>X</button>
                </div>
            </div>
        </div>
    )
}

export default AddNew;