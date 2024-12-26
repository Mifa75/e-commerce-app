const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// User routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
