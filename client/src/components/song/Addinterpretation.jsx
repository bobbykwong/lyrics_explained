import React, { useState } from 'react'

function Interpretation(props) {
    const verseIndex = props.verseIndex
    return(
        <form className="add-interpretation-form">
          <textarea className="form-control add-interpretation-input" type="search" placeholder="Add your own interpretations" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0 search-btn add-interpretation-btn" type="submit" >Add Interpretation</button>
        </form>
    )
}

export default Interpretation