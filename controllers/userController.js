const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Register User (Already Implemented)
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await userModel.findUserByEmailOrUsername(email, username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or username' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newUser = await userModel.createUser(username, email, hashedPassword);

    // Return the new user's information (without the password)
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (admin access only)
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get user details by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash password if provided
    let hashedPassword = user.password;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Update the user
    const updatedUser = await userModel.updateUser(userId, username, email, hashedPassword);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Configure Passport for Local Authentication
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await userModel.findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const isValidPassword = userModel.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

module.exports = { 
  registerUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  passport 
};
