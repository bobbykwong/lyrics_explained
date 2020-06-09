const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======             CONFIGURATION          =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


// const pg = require('pg');
// const url = require('url');

// var configs;

// if( process.env.DATABASE_URL ){

//     const params = url.parse(process.env.DATABASE_URL);
//     const auth = params.auth.split(':');

//     configs = {
//     user: auth[0],
//     password: auth[1],
//     host: params.hostname,
//     port: params.port,
//     database: params.pathname.split('/')[1],
//     ssl: { rejectUnauthorized: false }
//     };

// }else{
//     configs = {
//     user: 'postgres',
//     host: '127.0.0.1',
//     database: 'lyrics_explained',
//     port: 5432
//     };
// }

// const pool = new pg.Pool(configs);

// pool.on('error', function (err) {
//     console.log('idle client error', err.message, err.stack);
// });


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