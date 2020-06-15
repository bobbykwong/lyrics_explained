import React, { useState } from 'react';
import './Addlyrics.css';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {GET_ARTIST} from '../../queries/queries'
import Existingartist from './Existingartist'
import Newartistform from './Newartistform'


function Addlyrics() {

    const [showForm, setShowForm] = useState(false);

    const addNewArtist = () => {
        setShowForm(!showForm)
    }

    let page;

    page = !showForm ? <Existingartist addNewArtist={addNewArtist}/> : <Newartistform />

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