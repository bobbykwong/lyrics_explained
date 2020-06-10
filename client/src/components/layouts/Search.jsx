import React from 'react'

function Search() {
    return(
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search Lyrics" aria-label="Search">
          </input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
}

export default Search