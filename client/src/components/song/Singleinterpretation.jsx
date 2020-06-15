import React, { useState } from 'react'

function Singleinterpretation(props) {
    let page;

    const content = props.content
    const likes = props.likes

    return(
        <div className="single-interpretation-div">
            <p className="single-interpretation-content">{content}</p>
            <img src="heart.svg" className="likes-img"/>
            <p className="single-interpretation-likes">{likes}</p>
        </div>
    )
}

export default Singleinterpretation