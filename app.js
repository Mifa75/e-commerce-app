const express = require('express');
const userRoutes = require('./routes/users');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// User routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
