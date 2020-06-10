import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Songlist from './components/Songlist';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
        <div>
            <h1>Oi oi</h1>
            <Songlist />
        </div>
    </ApolloProvider>
  );
}

export default App;