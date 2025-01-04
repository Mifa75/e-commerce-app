const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
    console.log(hashedPassword);
    // Create the user
    const newUser = await userModel.createUser(username, email, hashedPassword);

    // Return the new user's information (without the password)
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Configure Passport for Local Authentication
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      // Find user in the database
      const user = await userModel.findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      // Verify password
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

module.exports = { registerUser };
