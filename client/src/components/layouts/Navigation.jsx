import React from 'react'
import {
  Link
} from "react-router-dom";

function Navigation() {
    return(
        <div>
            <h1>This is Navigation</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav>
        </div>
    )
}

export default Navigation