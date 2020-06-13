import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks"
import {gql} from 'apollo-boost';
import Form from './Form'


const ADD_ARTIST = gql`
    mutation($name: String!, $artist_cover: String!) {
        addArtist(name: $name, artist_cover: $artist_cover){
            name
            id
            artist_cover
        }
    }
`;

function Newartistform() {
    // Getting state from the input fields
    const [clicked, setClick] = useState([0]);
    const [artistName, setArtistName] = useState("");
    const [artistCover, setArtistCover] = useState("");
    const [submitArtist, setSubmitArtist] = useState(false);
    const [artistData, setArtistData] = useState({});

    // What is being rendered in the dom
    let formState;

    console.log(artistData)
    if (!("data" in artistData)) {
        formState = (
            <div>
                <div className="header">
                    <h2>Add a new Artist</h2>
                </div>
                <form className="lyrics-form text-center" onSubmit={e => {submitHandler(e)}}>
                    <input className="form-control input-field" placeholder="Artist" onChange={(event) => setArtistName(event.target.value)} />
                    <input className="form-control input-field" placeholder="Artist Cover Image link" onChange={(event) => setArtistCover(event.target.value)} />
                    <button type="submit" className="btn verse-btn mx-auto">Submit</button>
                </form>
            </div>
        )
    }
    else if ("data" in artistData){
        const data = artistData.data.addArtist
        formState = <Form data={data}/>
    }

    // Creating mutation function
    const [addArtist] = useMutation(ADD_ARTIST);

    const submitHandler = (e) => {
        e.preventDefault();
        addArtist({ variables: { name: artistName, artist_cover: artistCover } })
            .then(results => {
                console.log(results)
                setArtistData(results)
            })
    }


    return(
        <div>
            {formState}
        </div>
    )
}


export default Newartistform