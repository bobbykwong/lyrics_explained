import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Songlist from './components/Songlist';
import Home from './components/Home';
import About from './components/About';
import Navigation from './components/layouts/Navigation'
import Addlyrics from './components/addlyrics/Addlyrics'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route path="/addlyrics">
                <Addlyrics />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
    </ApolloProvider>
  );
}

export default App;