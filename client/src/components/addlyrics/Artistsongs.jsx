import React from 'react'

function Artistsongs(props) {
    let artistName
    let songTable
    let songList
    if ("artist" in props.data) {
        const artist = props.data.artist
        console.log(artist)
        artistName = artist.name

        songList = artist.songs.map(song => {
            return(
                <tr>
                  <th scope="row">1</th>
                  <td>{song.title}</td>
                </tr>
            )
        })

        songTable = (
            <table class="table">
              <tbody>
                {songList}
              </tbody>
            </table>
        )
    }

    return(
        <div>
            <p>{artistName}</p>
            {songTable}
        </div>
    )
}

export default Artistsongs