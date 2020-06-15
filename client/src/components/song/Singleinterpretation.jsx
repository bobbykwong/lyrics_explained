import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks"
import {gql} from 'apollo-boost';

const UPDATE_LIKES = gql`
    mutation($likes: Int! $id: Int!) {
        updateLikes(likes: $likes, id: $id){
            likes
            id
        }
    }
`;

function Singleinterpretation(props) {
    let page;

    const content = props.content
    const likes = props.likes
    const interpretationID = props.id

    // Create mutation
    const [updateLikes] = useMutation(UPDATE_LIKES);

    const addLike = (e) => {
        e.preventDefault()

        updateLikes({variables: {likes: likes+1, id: interpretationID}})
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