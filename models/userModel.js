const db = require('../db/db');
const bcrypt = require('bcryptjs');

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

// Function to find user by username
const findUserByUsername = async (username) => {
  try {
    const result = await db.pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching user');
  }
};

// Function to verify the password
const verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { 
  findUserByEmailOrUsername, 
  createUser,
  findUserByUsername,
  verifyPassword
};
