import React from 'react'
import Howitworks from './Howitworks'
import Latestrelease from './Latestrelease'
import Lyricsaddition from './Lyricsaddition.jsx'
import Song from '../song/Song'


function Home(props) {
    let page;
    if (props.songData.length === 0) {
        page = (
            <div>
                <Howitworks />
                <Latestrelease />
                <Lyricsaddition />
            </div>
        )
    }
    else if ('song' in props.songData) {
        const song = props.songData.song
        page = <Song songData={song}/>
    }


    return(
        <div>
            {page}
        </div>
    )
}

export default Home