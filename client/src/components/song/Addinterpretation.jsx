import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks"
import {ADD_INTERPRETATION, GET_SONG} from '../../queries/queries'
import {gql} from 'apollo-boost';


function Interpretation(props) {
    const verseIndex = props.verseIndex
    const title = props.songData.title

    const [interpretations, setInterpretations] = useState("")

    // Create mutation
    const [addInterpretation] = useMutation(ADD_INTERPRETATION);

    const addingInterpretation = (e) => {
        e.preventDefault()

        addInterpretation({
            variables: {content: interpretations, likes: 0, verse_id: verseIndex},
            refetchQueries: [{
                query: GET_SONG,
                variables: {title: title}
            }],
            awaitRefetchQueries: true,
        })
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