import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks"
import {gql} from 'apollo-boost';

const ADD_ARTIST = gql`
    mutation($name: String!, $artist_cover: String!) {
        addArtist(name: $name, artist_cover: $artist_cover){
            name
        }
    }
`;

function Form() {
    const [clicked, setClick] = useState([0]);
    const [artistName, setArtistName] = useState("");
    const [artistCover, setArtistCover] = useState("");

    let input;
    const [addArtist, { data }] = useMutation(ADD_ARTIST);

    const verseField = clicked.map((field, index) => {
        return (
            <textarea key={index} className="form-control input-field" placeholder="Lyrics here. Add a new verse whenever you think it deserves its own set of interpretations"/>
        )
    })

    const submitHandler = (e) => {
        e.preventDefault();
        addArtist({ variables: { name: artistName, artist_cover: artistCover } });
    }

    return(
        <form className="lyrics-form text-center" onSubmit={e => {submitHandler(e)}}>
            <input className="form-control input-field" placeholder="Artist" onChange={(event) => setArtistName(event.target.value)} />
            <input className="form-control input-field" placeholder="Artist Cover Image link" onChange={(event) => setArtistCover(event.target.value)} />
            <input className="form-control input-field" placeholder="Song Title"/>
            {verseField}
            <button type="button" className="btn verse-btn mx-auto" onClick={() => setClick([...clicked, clicked[clicked.length - 1] + 1 ])}>New Verse</button>
            <button type="submit" className="btn verse-btn mx-auto">Submit</button>
        </form>
    )
}


export default Form