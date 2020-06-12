import React from 'react';
import Form from './Form';
import './Addlyrics.css';

function Addlyrics() {
    return(
        <div>
            <div className="header">
                <h2>Add lyrics to your favourite song</h2>
            </div>
            <form >
                <input className="form-control" placeholder="Artist"/>
            </form>
            <Form />
        </div>
    )
}

export default Addlyrics