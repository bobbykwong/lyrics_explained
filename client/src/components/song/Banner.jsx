import React from 'react'

function Banner(props) {
    // Assiging song data to variables for ease of reference
    const songData = props.songData
    const artistName = songData.artist[0].name
    const artistImg = songData.artist[0].artist_cover
    const songTitle = songData.title

    return(
        <div className="artist-banner">
            <img src={artistImg} className="artist-img" alt="artist"/>
            <div className="artist-info">
                <h2 className="song-title">{songTitle}</h2>
                <h3 className="artist-name">{artistName}</h3>
            </div>
        </div>
    )
}

export default Banner