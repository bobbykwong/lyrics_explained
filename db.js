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



const pg = require('pg');
const url = require('url');

console.log(process.env)
console.log("showing the environment now")
console.log(process.env.ENVIRONMENT)
const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile.js')[environment];

var configs;


if( process.env.DATABASE_URL ){

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false }
    };

}else{
    configs = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'lyrics_explained',
    port: 5432
    };
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});


var knex = require('knex')(config);

/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======        REQUIRE MODEL FILES         =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */



/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======          MODULE EXPORTS            =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


module.exports = {
    //make queries directly from here
    // queryInterface: (text, params, callback) => {
    //     return pool.query(text, params, callback);
    // },

    // get a reference to end the connection pool at server end
    pool:pool,

    knex:knex
};