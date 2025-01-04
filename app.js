const express = require('express');
const passport = require('./controllers/userController');  
const session = require('express-session');
const userRoutes = require('./routes/users');  
const productRoutes = require('./routes/products'); 
const cartRoutes = require('./routes/cart'); 
const app = express();
const PORT = 3000;
const db = require('./db/db');

// Middleware to parse JSON
app.use(express.json());

// Initialize session for maintaining user sessions
app.use(session({
  secret: 'your_secret_key', // Replace with a real secret key
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport for handling user authentication
app.use(passport.initialize());
app.use(passport.session());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// User-related routes
app.use('/api/users', userRoutes);  // Mount user routes here

// Product-related routes
app.use('/api/products', productRoutes);  // Mount product routes here

// Cart routes
app.use('/api/cart', cartRoutes);

// Database connection test
db.pool.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to the PostgreSQL database:', err);
  });

// Login Route (for handling user login)
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirect to dashboard on successful login
  failureRedirect: '/login', // Redirect back to login page on failure
  failureFlash: true,  // Show flash message if login fails
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
