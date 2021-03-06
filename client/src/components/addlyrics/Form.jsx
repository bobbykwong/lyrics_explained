import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks"
import {gql} from 'apollo-boost';
import {ADD_SONG, ADD_VERSE} from '../../queries/queries';

function Form(props) {
    // Getting artist data from props
    const artistName = props.data.name
    const artistCover = props.data.artist_cover
    const artistID = parseInt(props.data.id)

    console.log(props)
    // Getting state from the input fields
    const [title, setTitle] = useState("");
    const [verses, setVerses] = useState([0]);

    // Creating mutation function
    const [addSong] = useMutation(ADD_SONG);
    const [addVerse] = useMutation(ADD_VERSE);

    const addingVerse = (e, index) => {
        const value = e.target.value
        const verseArray = verses.map((el, i) => {
            if (i === index) {
                return value
            }else{
                return el
            }
        })

        setVerses(verseArray)
    }

    const verseField = verses.map((field, index) => {
        return (
            <textarea key={index} className="form-control input-field" onChange={(e) => {addingVerse(e, index)}} placeholder="Lyrics here. Add a new verse whenever you think it deserves its own set of interpretations"/>
        )
    })

    const submitHandler = (e) => {
        e.preventDefault();
        addSong({ variables: {title: title, artist_id: artistID} })
            .then(results => {
                const songID = parseInt(results.data.addSong.id)

                // Add mutations for verse using loop

                let promises = []

                verses.forEach((el, index) => {
                    promises.push(addVerse({ variables: {content: el, position: index, song_id: songID}})
                    )
                })

                Promise.all(promises)
                    .then(() => {
                        window.location = '/'
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error)
            })
    }


    return(
        <div>
            <img src={artistCover} className="artist-image"></img>
            <h3 className="artist-name">{artistName}</h3>

            <form className="lyrics-form text-center" onSubmit={e => {submitHandler(e)}}>
                <input className="form-control input-field" placeholder="Song Title" onChange={(event) => setTitle(event.target.value)}/>
                {verseField}
                <button type="button" className="btn verse-btn mx-auto" onClick={() => setVerses([...verses, verses.length ])}>New Verse</button>
                <button type="submit" className="btn verse-btn mx-auto">Submit</button>
            </form>
        </div>
    )
}


export default Form