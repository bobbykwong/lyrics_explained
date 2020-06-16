import React, { useState } from 'react'
import Singleinterpretation from './Singleinterpretation'

function Allinterpretations(props) {
    let page;
    const songData = props.songData
    const verseIndex = props.verseIndex
    const verses = songData.verses
    const title = songData.title

    // Find interpretations that correspond to verse id
    let interpretations = [];
    for (var i = 0; i < verses.length; i++) {
        if (verseIndex === verses[i].id){
            interpretations = verses[i].interpretations
        }
    }

    // Arrange interpretations based on number of likes
    let interpretationsSorted
    if (interpretations.length > 1) {
        // If there is only one or no interpretations
        interpretationsSorted = interpretations

        // Sort interpretations with insertion sort rather than bubble sort
        for (var i = 0; i < interpretations.length; i++) {
            let currentEl = interpretations[i]

            let e
            for (e = i-1; e >= 0 && interpretations[e].likes < currentEl.likes; e--) {
                interpretationsSorted[e+1] = interpretations[e]
            }
            interpretationsSorted[e+1] = currentEl
        }

    }else{
        interpretationsSorted = interpretations
    }

    const allInterpretations = interpretationsSorted.map((el, index) => {

        const content = el.content
        const likes = el.likes
        const id = el.id

        return (
            <Singleinterpretation key={index} content={content} likes={likes} id={id} title={title}/>
        )
    })

    return(
        <div>
            {allInterpretations}
        </div>
    )
}

export default Allinterpretations