import React, { useState } from 'react';
import Form from './Form';
import './Addlyrics.css';
import Existingartist from './Existingartist'


function Addlyrics() {
    const [showForm, setShowForm] = useState(false);

    const addNewArtist = () => {
        setShowForm(!showForm)
    }

    let page;

    page = !showForm ? <Existingartist addNewArtist={addNewArtist}/> : <Form />


    return(
        <div className="addlyrics-div">
            {page}
        </div>
    )
}

export default Addlyrics