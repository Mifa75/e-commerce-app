const express = require('express');
const userRoutes = require('./routes/users');
const app = express();
const PORT = 3000;
const db = require('./db/db');

// Middleware to parse JSON
app.use(express.json());

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// User routes
app.use('/api/users', userRoutes);

// Test database connection
db.pool.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to the PostgreSQL database:', err);
  });

  // Login Route (POST /login)
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirect to dashboard after successful login
  failureRedirect: '/login', // Redirect to login page if authentication fails
  failureFlash: true, // Flash error message if authentication fails
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
