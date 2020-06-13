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

function Form(props) {
    // Getting artist data from props
    const artistName = props.data.name
    const artistCover = props.data.artist_cover
    const artistID = props.data.id

    // Getting state from the input fields
    const [clicked, setClick] = useState([0]);
    const [title, setTitle] = useState("");

    // Creating mutation function
    const [addSong] = useMutation(ADD_SONG);

    const verseField = clicked.map((field, index) => {
        return (
            <textarea key={index} className="form-control input-field" placeholder="Lyrics here. Add a new verse whenever you think it deserves its own set of interpretations"/>
        )
    })

    const submitHandler = (e) => {
        e.preventDefault();
        addSong({ variables: {title: title, artist_id: artistID} })
            .then(results => {

            })
        window.location = '/'
    }

    return(
        <div>
            <div className="header">
                <h2>Add lyrics to your song</h2>
            </div>
            <form className="lyrics-form text-center" onSubmit={e => {submitHandler(e)}}>
                <input className="form-control input-field" placeholder="Song Title" onChange={(event) => setTitle(event.target.value)}/>
                {verseField}
                <button type="button" className="btn verse-btn mx-auto" onClick={() => setClick([...clicked, clicked[clicked.length - 1] + 1 ])}>New Verse</button>
                <button type="submit" className="btn verse-btn mx-auto">Submit</button>
            </form>
        </div>
    )
}


export default Form