import React, {useState} from 'react';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Artistsongs from './Artistsongs';

const GET_ARTIST = gql`
    query Artist($name: String!){
        artist(name: $name) {
            name
            songs{
                title
            }
        }
    }
`;

function Existingartist(props) {
    const [artist, setArtist] = useState("");
    const [findArtist, setFindArtist] = useState(false);
    const [artistData, setArtistData] = useState({});

    let showArtist = <Artistsongs data={artistData} />

    const { loading, error, data } = useQuery(GET_ARTIST, {variables: {name: artist}});

    const findArtistHandler = (e) => {
        e.preventDefault()
        if (error) showArtist = <p>Whoops got an error Fetching</p>;
        if (loading || !data) showArtist = <p>Loading...</p>;
        setArtistData(data)
    }

    return(
        <div>
            <div className="header">
                <h2>Find from existing artists</h2>
            </div>
            <form className="lyrics-form">
                <input className="form-control input-field" placeholder="Artist" onChange={(event) => {setArtist(event.target.value)}}/>
                <button className="btn new-artist-btn" onClick={(event) => {findArtistHandler(event)}}>Find Artist</button>
            </form>
            {showArtist}
            <button className="btn new-artist-btn" onClick={() => {props.addNewArtist()}}>Add new Artist</button>

        </div>
    )
}

export default Existingartist