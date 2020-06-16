import React from 'react'


function Nosong(props) {


    return(
        <div className="no-song">
            <p className="no-song-header">Whoops we don't know the lyrics to that one</p>
            <img className="no-song-img" src="https://media2.giphy.com/media/SG7BQND0ubI6k/giphy.gif?cid=ecf05e47c2aa20adc03c9af445dd0623142c7331f81cf15c&rid=giphy.gif" />
            <p>Help us add the lyrics if you know them!</p>
        </div>
    )
}

export default Nosong