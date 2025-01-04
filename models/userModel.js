const db = require('../db/db');
const bcrypt = require('bcryptjs');

// Function to find user by email or username
const findUserByEmailOrUsername = async (email, username) => {
  const query = `SELECT * FROM users WHERE email = $1 OR username = $2`;
  const { rows } = await db.query(query, [email, username]);
  return rows[0]; // Return the first user if found
};

// Function to create a new user
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
  const result = await db.pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

// Function to verify password
const verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

// Get all users
const getAllUsers = async () => {
  const query = 'SELECT id, username, email FROM users';
  const result = await db.pool.query(query);
  return result.rows; // Return all users
};

// Get user by ID
const getUserById = async (userId) => {
  const query = 'SELECT id, username, email FROM users WHERE id = $1';
  const { rows } = await db.pool.query(query, [userId]);
  return rows[0]; // Return the user by ID
};

// Update user by ID
const updateUser = async (userId, username, email, hashedPassword) => {
  const query = `
    UPDATE users
    SET username = $1, email = $2, password = $3
    WHERE id = $4
    RETURNING id, username, email;
  `;
  const { rows } = await db.pool.query(query, [username, email, hashedPassword, userId]);
  return rows[0]; // Return the updated user
};

module.exports = { 
  findUserByEmailOrUsername, 
  createUser, 
  findUserByUsername, 
  verifyPassword, 
  getAllUsers, 
  getUserById, 
  updateUser 
};
