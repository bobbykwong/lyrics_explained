import React, { useState } from 'react'
import Addinterpretation from './Addinterpretation'

function Interpretation(props) {
    // Only show Interpretation on click of verse
    let page;

    if (typeof props.verseIndex === "number") {
        // Assiging song data to variables for ease of reference
        const songData = props.songData
        const verseIndex = props.verseIndex

        const interpretations = songData.verses[verseIndex].interpretations

        page = (
            <div>
                <Addinterpretation verseIndex={verseIndex}/>
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