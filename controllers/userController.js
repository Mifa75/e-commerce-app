const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

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

module.exports = { registerUser };
