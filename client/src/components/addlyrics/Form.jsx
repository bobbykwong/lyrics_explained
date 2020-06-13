import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks"
import {gql} from 'apollo-boost';

const ADD_SONG = gql`
    mutation($title: String!, $artist_id: Int!) {
        addSong(title: $title, artist_id: $artist_id){
            title
        }
    }
`;

const ADD_VERSE = gql`
    mutation($content: String!, $position: Int!, $song_id: Int!) {
        addVerse(content: $content, position: $position, song_id: $song_id){
            content
        }
    }
`;

function Form(props) {
    // Getting artist data from props
    const artistName = props.data.name
    const artistCover = props.data.artist_cover
    const artistID = props.data.id

    // Getting state from the input fields
    const [clicked, setClick] = useState([0]);
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

            })
        window.location = '/'
    }

    console.log(verses)
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