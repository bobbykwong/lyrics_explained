import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import {GET_SONG} from '../../queries/queries'
import Addinterpretation from './Addinterpretation'
import Allinterpretations from './Allinterpretations'


function Interpretation(props) {
    // Only show Interpretation on click of verse
    let page;
    const songTitle = props.songData.title
    // Query song
    const { loading, error, data, refetch } = useQuery(GET_SONG, {variables: {title: songTitle}});

    if (typeof props.verseIndex === "number") {
        // Assiging song data to variables for ease of reference
        const songData = data.song
        const verseIndex = props.verseIndex

        page = (
            <div>
                <Addinterpretation songData={songData} verseIndex={verseIndex}/>
                <Allinterpretations songData={songData} verseIndex={verseIndex}/>
            </div>
        )
    }

    return(
        <div className="col-md-6">
            {page}
        </div>
    )
}

export default Interpretation