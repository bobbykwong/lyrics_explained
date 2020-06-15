import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import {GET_SONG} from '../../queries/queries'


function Search(props) {
    const [song, setSong] = useState("")

    // Query song
    const { loading, error, data, refetch } = useQuery(GET_SONG, {variables: {title: song}});
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