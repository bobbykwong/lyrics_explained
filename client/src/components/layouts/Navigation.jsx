import React from 'react'
import {
  Link
} from "react-router-dom";

function Navigation() {
    return(
        <nav className="navbar ">
          <ul>
            <div class="navbar-brand">
                <Link to="/">Home</Link>
            </div>
            <li>
              <Link to="/addlyrics">Add Lyrics</Link>
            </li>
          </ul>
        </nav>
    )
}

export default Navigation