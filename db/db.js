const { Pool } = require('pg');
require('dotenv').config();

// Configure the connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export query method for use in the app
module.exports = {
  query: (text, params) => pool.query(text, params),
};
