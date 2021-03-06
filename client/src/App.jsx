import React, { useState }from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/home/Home';
import Navigation from './components/layouts/Navigation'
import Footer from './components/layouts/Footer'
import Addlyrics from './components/addlyrics/Addlyrics'


const client = new ApolloClient({

});


function App() {
  const [songData, setSongData] = useState([])

  const showSong = (data) => {
    setSongData(data)
  }

  const homePageClick = () => {
    setSongData([])
  }

  return (
    <ApolloProvider client={client}>
        <Router>
          <div>
            <Navigation showSong={showSong} homePageClick={homePageClick}/>
            <Switch>
              <Route path="/addlyrics">
                <Addlyrics />
              </Route>
              <Route path="/">
                <Home songData={songData}/>
              </Route>
            </Switch>
            <Footer />
          </div>
        </Router>
    </ApolloProvider>
  );
}

export default App;