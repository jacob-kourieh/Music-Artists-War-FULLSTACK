import { useEffect, useState } from 'react'
import "../Gallery/gallery.css"
import { baseURL } from '../../Utils/baseURL'
import FileBase64 from "react-file-base64"

const AddNew = ({ close }) => {

    const [artists, setArtists] = useState([]);
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [nationality, setNationality] = useState('')
    const [genres, setGenres] = useState('')
    const [img, setImg] = useState("")





    function getArtists() {
        fetch(`${baseURL}/artists/`)
            .then((response) => response.json())
            .then((data) => setArtists(data));
    }



    /*   async function deleteArtists(id) {
          const response = await fetch(
              "http://localhost:1335/hamster/delete/" + id,
              {
                  method: "DELETE",
              }
          );
          await response.text();
          setArtists((hamsters) =>
              hamsters.filter((hamsters) => hamsters._id !== id)
          );
      } */

    async function addArtist() {
        let hamster = {
            name: name,
            age: age,
            nationality: nationality,
            genres: genres,
            imgName: img
        }
        const response = await fetch(`${baseURL}/artist`, {
            method: "POST",
            body: JSON.stringify(hamster),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setArtists([...artists, data])
        window.location.reload();
    }
    useEffect(() => {
        getArtists();
    }, []);

    return (
        <div className="overlay">
            <div className="dialog">
                <h2>Add a new hamster</h2>
                <form onSubmit={() => addArtist()}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="age"> Age:</label>
                    <input type="number" onChange={(e) => setAge(e.target.value)} />

                    <label htmlFor="loves">Nationality:</label>
                    <input type="text" onChange={(e) => setNationality(e.target.value)} />

                    <label htmlFor="favFood">Music Genres:</label>
                    <input type="text" onChange={(e) => setGenres(e.target.value)} />

                    <label htmlFor="imgName">URL image:</label>
                    <input type="text" onChange={(e) => setImg(e.target.value)} />

                    <label htmlFor="imgName">Image:</label>
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => setImg(base64)}
                    />

                    <input className="main-btn" type="submit" value="Send" />
                </form>
                <div>
                    {/* <button className="main-btn" onClick={() => { close(); }}> Add hamster </button> */}
                    <button className="close-btn" onClick={close}>X</button>
                </div>
            </div>
        </div>
    )
}

export default AddNew;























/* import React from 'react'
import { useState, useEffect } from 'react'
import '../Components/uploadHamsters.css'
import HamsterCard from './HamsterCard'


function UploadHamsters() {
    const [hamsters, setHamsters] = useState([])
    const [nameInput, setNameInput] = useState('')
    const [fieldTouched, setFieldTouched] = useState(false)

    const [ageInput, setAgeInput] = useState('')
    const [ageTouched, setAgeTouched] = useState(false)

    const [foodInput, setFoodInput] = useState('')
    const [foodTouched, setFoodTouched] = useState(false)

    const [hobbyInput, setHobbyInput] = useState('')
    const [hobbyTouched, setHobbyTouched] = useState(false)

    const [urlInput, setUrlInput] = useState('')
    const [urlTouched, setUrlTouched] = useState(false)

    const [hamsterAdded, setHamsterAdded] = useState(false)




    const sendRequest = async () => {
        const response = await fetch("http://localhost:1335/hamsters")
        const data = await response.json()
        setHamsters(data)

    }



    useEffect(() => {
        sendRequest()
    }, []);


    //hamsterAdded
    let hamsterAddedMessage = 'Hamstern är nu tillagd'
    let hamstererrorMassege = 'pleas write all right'


    //Validering för name
    let nameIsValid = (nameInput !== '')
    let nameErrorMessage = ''
    if (nameInput === '' || nameInput.length <= 1) {
        nameIsValid = false
        nameErrorMessage = 'Vänligen skriv in ett namn'
    }

    let nameClass = ''
    if (fieldTouched) {
        nameClass = (nameIsValid ? 'valid' : 'error')
    }

    //Validering för age
    let ageIsValid = (ageInput !== '')
    let ageErrorMessage = ''
    if (ageInput === '' || ageInput <= 1) {
        ageIsValid = false
        ageErrorMessage = 'Vänligen skriv in en ålder'
    }
    let ageClass = ''
    if (ageTouched) {
        ageClass = (ageIsValid ? 'valid' : 'error')
    }

    //Validering för favoritmat
    let foodIsValid = (foodInput !== '')
    let foodErrorMessage = ''
    if (foodInput === '' || foodInput.length <= 1) {
        foodIsValid = false
        foodErrorMessage = 'Vänligen skriv in favoritmat'
    }
    let foodClass = ''
    if (foodTouched) {
        foodClass = (foodIsValid ? 'valid' : 'error')
    }

    //Validering för hobby
    let hobbyIsValid = (hobbyInput !== '')
    let hobbyErrorMessage = ''
    if (hobbyInput === '' || hobbyInput.length <= 1) {
        hobbyIsValid = false
        hobbyErrorMessage = 'Vänligen skriv in en hobby'
    }
    let hobbyClass = ''
    if (hobbyTouched) {
        hobbyClass = (hobbyIsValid ? 'valid' : 'error')
    }

    //Validering för Url
    let urlIsValid = (urlInput !== '')
    let urlErrorMessage = ''
    if (urlInput === '') {
        urlIsValid = false
        urlErrorMessage = 'Vänligen skriv in url:en till bilden'
    }
    let urlClass = ''
    if (urlTouched) {
        urlClass = (urlIsValid ? 'valid' : 'error')
    }

    const formIsValid = nameIsValid && ageIsValid && hobbyIsValid && foodIsValid

    async function postHamster() {
        const newHamster = {
            name: nameInput,
            age: ageInput,
            favFood: foodInput,
            loves: hobbyInput,
            imgName: urlInput,
            games: 0,
            wins: 0,
            defeats: 0
        }
        const response = await fetch("http://localhost:1335/hamster",
            {
                method: 'POST', headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newHamster)
            })
        const data = await response.text()
        console.log('Hamster skickad!' + data)
        setHamsterAdded(true)
        NewBattle()
    }


    const NewBattle = () => {
        window.location.reload();
    }

    return (
        <div >
            <h3>LÄGG TILL EN HAMSTER</h3>
            <section className="form">
                <div >
                    <label>Namn:<br />
                        <input type="text" placeholder="Namn" required
                            onChange={event => { console.log(event.target.value); setNameInput(event.target.value) }} value={nameInput}
                            onBlur={() => setFieldTouched(true)}
                            className={nameClass}

                        ></input></label>
                    {fieldTouched ? <div className="message"> {nameErrorMessage}</div> : null}
                </div><br /><br />

                <div>
                    <label>Ålder:<br />
                        <input type="number" required min="0" max="100" placeholder="Ålder"
                            onChange={event => {
                                console.log(event.target.value);
                                setAgeInput(event.target.value)
                            }} value={ageInput}
                            onBlur={() => setAgeTouched(true)}
                            className={ageClass}

                        ></input></label>
                    {ageTouched ? <div className="message"> {ageErrorMessage}</div> : null}
                </div><br /><br />

                <div>
                    <label>Favoritmat:<br />
                        <input type="text" placeholder="Favoritmat" required
                            onChange={event => {
                                console.log(event.target.value);
                                setFoodInput(event.target.value)
                            }} value={foodInput}
                            onBlur={() => setFoodTouched(true)}
                            className={foodClass}
                        ></input></label>
                    {foodTouched ? <div className="message"> {foodErrorMessage}</div> : null}
                </div><br /><br />

                <div>
                    <label>Hobby:<br />
                        <input type="text" placeholder="Hobby" required
                            onChange={event => {
                                console.log(event.target.value);
                                setHobbyInput(event.target.value)
                            }} value={hobbyInput}
                            onBlur={() => setHobbyTouched(true)}
                            className={hobbyClass}
                        ></input></label>
                    {hobbyTouched ? <div className="message"> {hobbyErrorMessage}</div> : null}
                </div><br /><br />

                <div>
                    <label>Url till bild:<br />
                        <input type="text" required placeholder="Url till bild"
                            onChange={event => {
                                console.log(event.target.value);
                                setUrlInput(event.target.value)
                            }} value={urlInput}
                            onBlur={() => setUrlTouched(true)}
                            className={urlClass}
                        ></input></label>
                    {urlTouched ? <div className="message"> {urlErrorMessage}</div> : null}
                </div><br /><br /><br />



                <button type="submit" disabled={!formIsValid} onClick={postHamster} className="submit--btn">LÄGG TILL HAMSTER</button>

            </section>
            {hamsterAdded ? <div className="addedMessage">{hamsterAddedMessage}</div> : <div className="addedMessage">{hamstererrorMassege}</div>}
            <section className='gallery__grid--container'>
                {hamsters
                    ? hamsters.map(obj => (
                        <HamsterCard handleClick={sendRequest} obj={obj} key={obj.id} />
                    ))
                    : ''}
            </section>



        </div>
    );
}

export default UploadHamsters */



/* import { useState } from "react";
import '../Components/uploadHamsters.css'

const AddNewHamster = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [favFood, setFavFood] = useState("");
    const [loves, setLoves] = useState("");
    const [imgName, setImgName] = useState("");

    const [controlledName, setControlledName] = useState("");
    const [controlledAge, setControlledAge] = useState("");
    const [controlledFavFood, setControlledFavFood] = useState("");
    const [controlledLoves, setControlledLoves] = useState("");
    const [controlledImgName, setControlledImgName] = useState("");

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [favFoodTouched, setFavFoodTouched] = useState(false);
    const [lovesTouched, setLovesTouched] = useState(false);
    const [imgNameTouched, setImgNameTouched] = useState(false);

    //Validering name
    let nameIsValid = true;
    let nameErrorMessage = "";
    if (name === "") {
        nameIsValid = false;
        nameErrorMessage = "Vänligen skriv din hamsters namn";
    }

    let nameClass = "";
    if (nameTouched) {
        nameClass = nameIsValid ? "valid" : "error";
    }

    //Validering age
    const allowedAgeCharacters = "0123456789";
    let ageIsValid = true;
    let ageErrorMessage = "";
    if (age === "") {
        ageIsValid = false;
        ageErrorMessage = "Vänligen skriv din hamsters ålder";
    } else if (
        !age.split("").every((char) => allowedAgeCharacters.includes(char))
    ) {
        ageIsValid = false;
        ageErrorMessage = "Vänligen skriv din hamsters ålder med siffror";
    }

    let ageClass = "";
    if (ageTouched) {
        ageClass = ageIsValid ? "valid" : "error";
    }

    //Validering favfood
    let favFoodIsValid = true;
    let favFoodErrorMessage = "";
    if (favFood === "") {
        favFoodIsValid = false;
        favFoodErrorMessage = "Vänligen skriv din hamsters favoritmat";
    }

    let favFoodClass = "";
    if (favFoodTouched) {
        favFoodClass = favFoodIsValid ? "valid" : "error";
    }

    //Validering loves
    let lovesIsValid = true;
    let lovesErrorMessage = "";
    if (loves === "") {
        lovesIsValid = false;
        lovesErrorMessage = "Vänligen skriv vad din hamster älskar";
    }

    let lovesClass = "";
    if (lovesTouched) {
        lovesClass = lovesIsValid ? "valid" : "error";
    }

    //Validering imgName
    let imgNameIsValid = true;
    let imgNameErrorMessage = "";
    if (imgName === "") {
        imgNameIsValid = false;
        imgNameErrorMessage = "Vänligen ange en URL till en bild på en hamster";
    }

    let imgNameClass = "";
    if (imgNameTouched) {
        imgNameClass = imgNameIsValid ? "valid" : "error";
    }

    //Validering av att alla inputfält är ifyllda
    let formIsInvalid =
        !nameIsValid ||
        !ageIsValid ||
        !favFoodIsValid ||
        !lovesIsValid ||
        !imgNameIsValid;

    async function postHamster() {
        const newHamster = {
            name: controlledName,
            age: (controlledAge),
            favFood: controlledFavFood,
            loves: controlledLoves,
            imgName: controlledImgName,
            wins: 0,
            defeats: 0,
            games: 0,
        };

        await fetch("http://localhost:1335/hamster", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newHamster),
        });
    }

    return (
        <div className="add-new-hamster-container">
            <div className="form-container">
                <h3>Add a new hamster </h3>
                <section>
                    <label>
                        Name <br />
                        <input
                            type="text"
                            onBlur={() => setNameTouched(true)}
                            onChange={(event) => {
                                console.log("Controlled change", event.target.value);
                                setName(event.target.value);
                                setControlledName(event.target.value);
                            }}
                            value={name}
                            className={nameClass}
                        />
                    </label>
                    {nameTouched ? (
                        <div className="message-hidden">{nameErrorMessage}</div>
                    ) : null}
                </section>
                <section>
                    <label>
                        Age <br />
                        <input
                            type="text"
                            onBlur={() => setAgeTouched(true)}
                            onChange={(event) => {
                                console.log("Controlled change", event.target.value);
                                setAge(event.target.value);
                                setControlledAge(event.target.value);
                            }}
                            value={age}
                            className={ageClass}
                        />
                    </label>
                    {ageTouched ? (
                        <div className="message-hidden">{ageErrorMessage}</div>
                    ) : null}
                </section>
                <section>
                    <label>
                        Favorite food <br />
                        <input
                            type="text"
                            onBlur={() => setFavFoodTouched(true)}
                            onChange={(event) => {
                                console.log("Controlled change", event.target.value);
                                setFavFood(event.target.value);
                                setControlledFavFood(event.target.value);
                            }}
                            value={favFood}
                            className={favFoodClass}
                        />
                    </label>
                    {favFoodTouched ? (
                        <div className="message-hidden">{favFoodErrorMessage}</div>
                    ) : null}
                </section>
                <section>
                    <label>
                        Loves <br />
                        <input
                            type="text"
                            onBlur={() => setLovesTouched(true)}
                            onChange={(event) => {
                                console.log("Controlled change", event.target.value);
                                setLoves(event.target.value);
                                setControlledLoves(event.target.value);
                            }}
                            value={loves}
                            className={lovesClass}
                        />
                    </label>
                    {lovesTouched ? (
                        <div className="message-hidden">{lovesErrorMessage}</div>
                    ) : null}
                </section>
                <section>
                    <label>
                        Image <br />
                        <input
                            type="text"
                            onBlur={() => setImgNameTouched(true)}
                            onChange={(event) => {
                                console.log("Controlled change", event.target.value);
                                setImgName(event.target.value);
                                setControlledImgName(event.target.value);
                            }}
                            value={imgName}
                            className={imgNameClass}
                        />
                    </label>
                    {imgNameTouched ? (
                        <div className="message-hidden">{imgNameErrorMessage}</div>
                    ) : null}
                </section>
                <div>
                    <button disabled={formIsInvalid} onClick={postHamster}>
                        Add new champion
                    </button>
                </div>
            </div>
            <div className="preview-container">
                <h3>Your new champion</h3>
                <p>
                    <span>Namn: </span>
                    {controlledName}
                </p>
                <p>
                    <span>Ålder: </span>
                    {controlledAge}
                </p>
                <p>
                    <span>Favoritmat: </span>
                    {controlledFavFood}
                </p>
                <p>
                    <span>Älskar: </span>
                    {controlledLoves}
                </p>
                <p>
                    <img src={controlledImgName} alt="" />
                </p>
            </div>
        </div>
    );
};

export default AddNewHamster; */




//___________________________________________________________________________________

/* import { useState } from 'react'
import "../Gallery/gallery.css"
import FileBase64 from "react-file-base64"

const AddNew = ({ close }) => {

    //Inputfält 
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [imgName, setImgName] = useState('')
    const [favFood, setFavFood] = useState('')
    const [loves, setLoves] = useState('')

    const [clickedField, setClickField] = useState(false)
    const [ageClicked, setAgeClicked] = useState(false)
    const [foodClicked, setFoodClicked] = useState(false)
    const [lovesClicked, setLovesClicked] = useState(false)
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

    const onFavFoodChange = e => {
        setFavFood(e.target.value)
        setFoodClicked(true)
    }
    const onLovesChange = e => {
        setLoves(e.target.value)
        setLovesClicked(true)
    }
    const onImgChange = e => {
        setImgName(e.target.value)
        setImgClicked(true)
    }


    //Valideringar
    const nameIsValid = isValidName(name)
    const ageIsValid = isValidAge(age)
    const foodIsValid = isValidFood(favFood)
    const lovesIsValid = isValidLove(loves)
    const formIsValid = nameIsValid && ageIsValid && foodIsValid && lovesIsValid


    //Functions
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

    function isValidFood(favFood) {
        return favFood.length >= 2
    }

    function isValidLove(loves) {
        return loves.length >= 2
    }

    //Data som skickas till POST-requestet
    const hamsterData = {
        name: name,
        age: age,
        imgName: imgName,
        loves: loves,
        favFood: favFood,
        games: 0,
        wins: 0,
        defeats: 0
    }

    const addNewHamster = async () => {
        //Genererar en randomiserad bild 

        await fetch("http://localhost:1335/hamster",
            {
                method: 'POST',
                headers: { Accept: 'application/json', "Content-Type": "application/json" },
                body: JSON.stringify(hamsterData)
            })
        window.location.reload();


    }

    return (
        <div className="overlay">
            <div className="dialog">
                <h2>Add a new hamster</h2>
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
                    <label htmlFor="favFood">Add favorite food</label>
                    <input
                        className={foodIsValid ? 'valid' : 'invalid'}
                        id="favFood"
                        type="text"
                        placeholder="Fave food"
                        value={favFood}
                        onChange={onFavFoodChange}
                    />
                    {!foodIsValid && foodClicked ?
                        <span className="input-alert"> Favorite food must be atleast 2 signs.</span>
                        : null
                    }
                    <label htmlFor="loves">What does it love?</label>
                    <input
                        className={lovesIsValid ? 'valid' : 'invalid'}
                        id="loves"
                        type="text"
                        placeholder="Loves to..."
                        value={loves}
                        onChange={onLovesChange}
                    />
                    {!lovesIsValid && lovesClicked ?
                        <span className="input-alert"> Loves must be atleast 2 signs.</span>
                        : null
                    }

                    <label htmlFor="imgName">Image URL</label>
                    <input
                        className={lovesIsValid ? 'valid' : 'invalid'}
                        id="img"
                        type="text"
                        placeholder="img url..."
                        value={imgName}
                        onChange={onImgChange}
                    />

                    <label htmlFor="imgName">Image:</label>
                    <FileBase64

                        multiple={false}
                        onDone={({ base64 }) => setImgName(base64)}
                    />

                </form>
                <div>
                    <button className="main-btn" disabled={!formIsValid} onClick={() => { addNewHamster(); close(); }}> Add hamster </button>
                    <button className="close-btn" onClick={close}>X</button>
                </div>
            </div>
        </div>
    )
}

export default AddNew;
 */
