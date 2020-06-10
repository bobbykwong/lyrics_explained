import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const getSongQuery = gql`
    {
        songs {
            title
        }
    }
`;

function Songlist() {
  const { loading, error, data } = useQuery(getSongQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data)

  return (
    <div>
        <p>ni hao</p>
        {songList}
    </div>
  );
}

export default Songlist;