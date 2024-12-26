const db = require('../db/db');

const findUserByEmailOrUsername = async (email, username) => {
  const query = `
    SELECT * FROM users 
    WHERE email = $1 OR username = $2
  `;
  const { rows } = await db.query(query, [email, username]);
  return rows[0]; // Return the first user if found
};

const createUser = async (username, email, hashedPassword) => {
  const query = `
    INSERT INTO users (username, email, password) 
    VALUES ($1, $2, $3) 
    RETURNING id, username, email;
  `;
  const { rows } = await db.query(query, [username, email, hashedPassword]);
  return rows[0]; // Return the newly created user
};

module.exports = { findUserByEmailOrUsername, createUser };
