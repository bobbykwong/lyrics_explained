import React, { useState } from 'react'
import Singleinterpretation from './Singleinterpretation'

function Allinterpretations(props) {
    let page;
    const songData = props.songData
    const verseIndex = props.verseIndex
    const verses = songData.verses

    // Find interpretations that correspond to verse id
    let interpretations;
    for (var i = 0; i < verses.length; i++) {
        if (verseIndex === verses[i].id){
            interpretations = verses[i].interpretations
        }
    }

    // Arrange interpretations based on number of likes
    let interpretationsSorted
    if (interpretations.length > 1) {
        for (var i = 0; i < interpretations.length; i++) {

            for (var e = i; e > 0 && interpretations[e-1].likes > interpretations[e].likes; e--) {
                interpretationsSorted[e-1] = interpretations[i].likes
                interpretationsSorted[e] = interpretations[e-1].likes
            }
        }
    }else{
        interpretationsSorted = interpretations
    }

    console.log(interpretationsSorted)

    const allInterpretations = interpretationsSorted.map((el, index) => {
        const content = el.content
        const likes = el.likes

        return (
            <Singleinterpretation key={index} content={content} likes={likes}/>
        )
    })

    return(
        <div>
            {allInterpretations}
        </div>
    )
}

export default Allinterpretations