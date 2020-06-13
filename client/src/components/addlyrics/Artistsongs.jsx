import React from 'react'

function Artistsongs(props) {
    let artistName
    let songTable
    let songList
    if ("artist" in props.data) {
        const artist = props.data.artist
        console.log(artist)
        artistName = artist.name

        songList = artist.songs.map((song, songIndex) => {
            return(
                <tr key={songIndex}>
                  <th scope="row">{songIndex}</th>
                  <td>{song.title}</td>
                </tr>
            )
        })

        songTable = (
            <table className="table artist-song-table">
              <tbody>
                {songList}
              </tbody>
            </table>
        )
    }

    return(
        <div>
            <h3>{artistName}</h3>
            {songTable}
        </div>
    )
}

export default Artistsongs