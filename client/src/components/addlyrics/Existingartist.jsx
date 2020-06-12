import React from 'react'

function Existingartist(props) {
    return(
        <div>
            <div className="header">
                <h2>Find from existing artists</h2>
            </div>
            <form className="lyrics-form">
                <input className="form-control input-field" placeholder="Artist"/>
            </form>
            <button className="btn new-artist-btn" onClick={() => {props.addNewArtist()}}>Add new Artist</button>
        </div>
    )
}

export default Existingartist