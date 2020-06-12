import React, { useState } from 'react';
import Form from './Form';
import './Addlyrics.css';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Existingartist from './Existingartist'

const GET_ARTIST = gql`
    {
        artist{
            name
            songs{
                title
            }
        }
    }
`;

function Addlyrics() {

    const [showForm, setShowForm] = useState(false);

    const addNewArtist = () => {
        setShowForm(!showForm)
    }

    let page;

    page = !showForm ? <Existingartist addNewArtist={addNewArtist}/> : <Form />

    const { loading, error, data } = useQuery(GET_ARTIST);
    if (error) return <p>Error</p>;
    if (loading || !data) return <p>Loading...</p>;

    console.log(data)

    return(
        <div className="addlyrics-div">
            {page}
        </div>
    )
}

export default Addlyrics