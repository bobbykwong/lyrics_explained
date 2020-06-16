import React, {useState} from 'react'
import { useQuery } from '@apollo/react-hooks';
import {GET_SONG} from '../../queries/queries'
import Howitworks from './Howitworks'
import Latestrelease from './Latestrelease'
import Lyricsaddition from './Lyricsaddition.jsx'
import Song from '../song/Song'


function Home(props) {
    const [title, setTitle] = useState(null)
    const [state, setState] = useState(false)
    const { loading, error, data, refetch } = useQuery(GET_SONG, {variables: {title: title}});
    // Trigger query when song is clicked
    const getSong = (songTitle) => {
        setTitle(songTitle)
    }
    const clickedSong = data

    let page;
    // Show lyrics when song is selected
    if (clickedSong) {
        const recentSong = data.song
        page = <Song songData={recentSong}/>
        // setTitle(null)
    }
    else if (props.songData.length === 0) {
        page = (
            <div>
                <Howitworks />
                <Latestrelease />
                <Lyricsaddition getSong={getSong}/>
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