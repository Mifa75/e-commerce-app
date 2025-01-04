const express = require('express');
const passport = require('./controllers/userController');  
const session = require('express-session');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products'); 
const app = express();
const PORT = 3000;
const db = require('./db/db');

// Middleware to parse JSON
app.use(express.json());

// Initialize session
app.use(session({
  secret: 'your_secret_key', // Replace with a real secret key
  resave: false,
  saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// User routes
app.use('/api/users', userRoutes);

// Product routes
app.use('/api/products', productRoutes); 

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
