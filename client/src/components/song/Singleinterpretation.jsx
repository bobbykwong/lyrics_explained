import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks"
import {UPDATE_LIKES, GET_SONG} from '../../queries/queries'


function Singleinterpretation(props) {
    let page;

    const content = props.content
    const likes = props.likes
    const interpretationID = props.id
    const title = props.title
    console.log(title)
    console.log(likes)

    // Create mutation
    const [updateLikes] = useMutation(UPDATE_LIKES);

    const addLike = (e) => {
        e.preventDefault()

        updateLikes({
            variables: {likes: likes+1, id: interpretationID},
            refetchQueries: [{
                query: GET_SONG,
                variables: {title: `${title}`}
            }],
            awaitRefetchQueries: true,
        })
    }

    return(
        <div className="single-interpretation-div">
            <p className="single-interpretation-content">{content}</p>
            <img src="heart.svg" className="likes-img" onClick={(e) => {addLike(e)}} />
            <p className="single-interpretation-likes">{likes}</p>
        </div>
    )
}

export default Singleinterpretation