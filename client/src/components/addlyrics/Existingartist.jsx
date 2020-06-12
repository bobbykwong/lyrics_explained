import React, {useState} from 'react';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';


const GET_ARTIST = gql`
    query Artist($name: String!){
        artist(name: $name) {
            name
        }
    }
`;

function Existingartist(props) {
    const [artist, setArtist] = useState("");
    const [findArtist, setFindArtist] = useState(false);

    const { loading, error, data } = useQuery(GET_ARTIST, {variables: {name: artist}});
    if (findArtist ) {
        console.log('found something')
        if (error) return <p>Whoops got an error Fetching</p>;
        if (loading || !data) return <p>Loading...</p>;
        console.log("artists that were found: " + data)
        setFindArtist(!findArtist);
    }


    return(
        <div>
            <div className="header">
                <h2>Find from existing artists</h2>
            </div>
            <form className="lyrics-form">
                <input className="form-control input-field" placeholder="Artist" onChange={(event) => {setArtist(event.target.value)}}/>
                <button className="btn new-artist-btn" onClick={() => {setFindArtist(!findArtist)}}>Find Artist</button>
            </form>
            <button className="btn new-artist-btn" onClick={() => {props.addNewArtist()}}>Add new Artist</button>

        </div>
    )
}

export default Existingartist