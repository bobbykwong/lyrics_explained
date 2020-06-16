import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks"
import {gql} from 'apollo-boost';
import Form from './Form'
import {ADD_ARTIST} from '../../queries/queries';


function Newartistform() {
    // Getting state from the input fields
    const [clicked, setClick] = useState([0]);
    const [artistName, setArtistName] = useState("");
    const [artistCover, setArtistCover] = useState("");
    const [submitArtist, setSubmitArtist] = useState(false);
    const [artistData, setArtistData] = useState({});

    // What is being rendered in the dom
    let page;

    if (!("data" in artistData)) {
        page = (
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
        page = <Form data={data}/>
    }

    // Creating mutation function
    const [addArtist] = useMutation(ADD_ARTIST);

    const submitHandler = (e) => {
        e.preventDefault();
        addArtist({ variables: { name: artistName, artist_cover: artistCover } })
            .then(results => {
                setArtistData(results)
            })
            .catch((error) => {
                console.error(error)
            })
    }


    return(
        <div>
            {page}
        </div>
    )
}


export default Newartistform