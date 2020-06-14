import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import {gql} from 'apollo-boost';


const GET_SONG = gql`
    query Song($title: String!){
        song(title: $title) {
            title
            id
            verses{
                content
                position
            }
            artist{
                name
                artist_cover
            }
        }
    }
`;

function Search(props) {
    const [song, setSong] = useState("")

    // Query song
    const { loading, error, data } = useQuery(GET_SONG, {variables: {title: song}});

    // Find song on click
    const findSong = (e) => {
        e.preventDefault()
        props.showSong(data)
    }

    return(
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2 search-bar" type="search" placeholder="Search Lyrics" aria-label="Search" onChange={(e) => {setSong(e.target.value)}}>
          </input>
          <button className="btn btn-outline-success my-2 my-sm-0 search-btn" type="submit" onClick={(e) => {findSong(e)}}>Search</button>
        </form>
    )
}

export default Search