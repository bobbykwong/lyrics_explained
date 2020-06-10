import React from 'react'

function Search() {
    return(
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2 search-bar" type="search" placeholder="Search Lyrics" aria-label="Search">
          </input>
          <button className="btn btn-outline-success my-2 my-sm-0 search-btn" type="submit">Search</button>
        </form>
    )
}

export default Search