import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks"
import {gql} from 'apollo-boost';

const ADD_INTERPRETATION = gql`
    mutation($content: String!, $likes: Int! $verse_id: Int!) {
        addInterpretation(content: $content, likes: $likes, verse_id: $verse_id){
            content
            likes
            id
        }
    }
`;

function Interpretation(props) {
    const verseIndex = props.verseIndex

    const [interpretations, setInterpretations] = useState("")

    // Create mutation
    const [addInterpretation] = useMutation(ADD_INTERPRETATION);

    const addingInterpretation = (e) => {
        e.preventDefault()

        addInterpretation({variables: {content: interpretations, likes: 0, verse_id: verseIndex}})
            .then(results => {
                console.log(results)
            })
    }

    return(
        <form className="add-interpretation-form">
          <textarea className="form-control add-interpretation-input" type="search" placeholder="Add your own interpretations" aria-label="Search" onChange={(e) => {setInterpretations(e.target.value)}}/>
          <button className="btn btn-outline-success my-2 my-sm-0 search-btn add-interpretation-btn" type="submit" onClick={(e) => {addingInterpretation(e)}}>Add Interpretation</button>
        </form>
    )
}

export default Interpretation