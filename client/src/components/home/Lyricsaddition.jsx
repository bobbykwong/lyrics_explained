import React from 'react'
import Lyricstable from './Lyricstable'


function Lyricsaddition(props) {
    return(
        <div className="lyrics-addition-div">
            <div className="header">
                <h2>Recent lyrics</h2>
            </div>
            <div>
                <Lyricstable getSong={props.getSong}/>
            </div>
        </div>
    )
}

export default Lyricsaddition