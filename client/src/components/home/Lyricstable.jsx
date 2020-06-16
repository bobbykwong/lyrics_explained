import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {GET_SONGS} from '../../queries/queries'


const clickHandler = () => {
    console.log('clicking')
}


function Lyricstable() {
    const { loading, error, data } = useQuery(GET_SONGS);
    if (error) return <p>Error</p>;
    if (loading || !data) return <p>Loading...</p>;

    const table = data.songs.map((song, index) => {
        return(
            <tr key={index} onClick={() => {clickHandler()}}>
              <th scope="row">{index}</th>
              <td>{song.title}</td>
              <td>{song.artist[0].name}</td>
              <td><img src={song.artist[0].artist_cover} className="artist-cover"/></td>
            </tr>
        )
    })

    return(
        <table className="table table-hover table-responsive-md lyrics-table">
          <tbody>
            {table}
          </tbody>
        </table>
    )
}

export default Lyricstable