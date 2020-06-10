import React from 'react'
import './Home.css'
import Instruction from './Instruction'

function Howitworks() {
    return(
        <div className="instructions-div">
            <div className="header">
                <h2>How It Works</h2>
            </div>
            <Instruction />
        </div>
    )
}

export default Howitworks