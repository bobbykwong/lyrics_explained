import React from 'react'
import {
  Link
} from "react-router-dom";
import '../../App.css';
import Search from './Search'

function Navigation(props) {

    return(
        <nav className="navbar navbar-dark bg-dark">
            <div className="navbar-brand">
                <Link className="navibar" to="/" onClick={() => {props.homePageClick()}}>Home</Link>
            </div>
            <div>
                <Search showSong={props.showSong}/>
            </div>
            <div>
              <Link className="navibar" to="/addlyrics">Add Lyrics</Link>
            </div>
        </nav>
    )
}

export default Navigation