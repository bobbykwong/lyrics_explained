import React from 'react'

function Lyrics(props) {
    // Assiging song data to variables for ease of reference
    const songData = props.songData
    const verses = songData.verses

    // Sort verses array based on position
    let verseArray = []
    for (var i = 0; i < verses.length; i++) {
        const versePosition = verses[i].position
        verseArray[versePosition] = [verses[i].content, verses[i].id]
    }

    // Map verse array
    const lyrics = verseArray.map((el, index) => {
        const content = el[0]
        const id = el[1]
        const verseLines = content.split('.')

        const verseLinesStyled = verseLines.map((e, i) => {
            return(
                <div key={i}>
                    <p>{e}</p>
                </div>
            )
        })

        return(
            <div className="verse-para" key={index} onClick={() => {props.showInterpretations(id)}}>
                {verseLinesStyled}
            </div>
        )
    })

    return(
        <div className="col-md-6">
            <div className="all-lyrics">
                {lyrics}
            </div>
        </div>
    )
}

export default Lyrics