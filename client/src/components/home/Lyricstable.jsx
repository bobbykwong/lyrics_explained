import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const GET_SONGS = gql`
    {
        songs {
            title
            artist{
                name
            }
        }
    }
`;


function Lyricstable() {
    const { loading, error, data } = useQuery(GET_SONGS);
    if (error) return <p>Error</p>;
    if (loading || !data) return <p>Loading...</p>;

    console.log(data)

    const table = data.songs.map((song, index) => {
        return(
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>{song.title}</td>
              <td>{song.artist[0].name}</td>
            </tr>
        )
    })

    return(
        <table className="table lyrics-table">
          <tbody>
            {table}
          </tbody>
        </table>
    )
}

export default Lyricstable