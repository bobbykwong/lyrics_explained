import React, {useState} from 'react';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Artistsongs from './Artistsongs';
import Form from './Form';

const GET_ARTIST = gql`
    query Artist($name: String!){
        artist(name: $name) {
            name
            artist_cover
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
    const [addSong, setAddSong] = useState(false);

    const { loading, error, data } = useQuery(GET_ARTIST, {variables: {name: artist}});

    const findArtistHandler = (e) => {
        e.preventDefault()
        if (error) showArtist = <p>Whoops got an error Fetching</p>;
        if (loading || !data) showArtist = <p>Loading...</p>;

        setArtistData(data)
    }

    const addLyrics = () => {
        setAddSong(!addSong)
    }

    let page

    let showArtist = <Artistsongs data={artistData} addLyrics={addLyrics}/>

    if (!addSong) {
        page = (
            <div>
                <div className="header">
                    <h2>Find from existing artists</h2>
                </div>
                <button className="btn new-artist-btn" onClick={() => {props.addNewArtist()}}>Add new Artist</button>
                <form className="lyrics-form">
                    <input className="form-control input-field" placeholder="Artist" onChange={(event) => {setArtist(event.target.value)}}/>
                    <button className="btn find-artist-btn" onClick={(event) => {findArtistHandler(event)}}>Find Artist</button>
                </form>
                {showArtist}
            </div>
        )
    }
    else if (addSong){
        page = <Form data={artistData.artist}/>
    }

    return(
        <div>
           {page}
        </div>
    )
}

export default Existingartist