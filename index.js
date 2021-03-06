const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors');
const app = express();
const path = require('path');
const pool = require('./db').pool

// allow cross-origin requests
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Getting PG configs from db file
const db = require('./db')

/**
 * ===================================
 * Listen to requests on port 4000
 * ===================================
 */
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);