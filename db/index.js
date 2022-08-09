const { Pool } = require('pg');

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'lyrics',
    password: 'password',
    port: 5432
});

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    }
  }

