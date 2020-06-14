import React, { useState } from 'react'
import './song.css'
import Banner from './Banner'
import Lyrics from './Lyrics'

function Song(props) {
    // Assiging song data to variables for ease of reference
    console.log(props.songData)
    const songData = props.songData
    const artistName = songData.artist[0].name
    const artistImg = songData.artist[0].artist_cover
    const songTitle = songData.title

    return(
        <div>
            <Banner songData={props.songData}/>
            <div className="container lyrics-container">
                <div className="row">
                    <Lyrics songData={props.songData}/>
                </div>
            </div>
        </div>
    )
}

export default Song