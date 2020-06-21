// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      database : 'lyrics_explained'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.PORT,
    pool: {
      min: 2,
      max: 10
    }
  }

};