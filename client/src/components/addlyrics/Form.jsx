import React, { useState } from 'react'

function Form() {
    const [clicked, setClick] = useState([0]);
    console.log(clicked)

    const verseField = clicked.map(field => {
        return (
            <textarea className="form-control input-field" placeholder="Lyrics here. Add a new verse whenever you think it deserves its own set of interpretations"/>
        )
    })

    return(
        <form className="lyrics-form text-center">
            <input className="form-control input-field" placeholder="Artist"/>
            <input className="form-control input-field" placeholder="Artist Cover Image link"/>
            <input className="form-control input-field" placeholder="Song Title"/>
            {verseField}
            <button type="button" className="btn verse-btn" onClick={() => setClick([...clicked, clicked[clicked.length - 1] + 1 ])}>New Verse</button>
        </form>
    )
}


export default Form