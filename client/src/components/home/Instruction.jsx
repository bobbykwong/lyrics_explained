import React from 'react'


function Instruction() {
    return(
        <div className="instructions">
            <div className="instruction">
                <p>
                    Search lyrics to your favourite songs
                </p>
            </div>
            <img src="/right_arrow.svg" alt="right arrow" className="right-arrow"/>
            <div className="instruction">
                <p>
                    Read interpretations to lyrics
                </p>
            </div>
            <img src="/right_arrow.svg" alt="right arrow" className="right-arrow"/>
            <div className="instruction">
                <p>
                    Add your own interpretations to lyrics
                </p>
            </div>
        </div>
    )
}

export default Instruction