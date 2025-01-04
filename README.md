E-commerce API
This project is a simple e-commerce API built using Node.js, Express, and PostgreSQL. It provides endpoints for user management, product management, cart management, checkout, and order history. The API also includes Swagger integration for interactive API documentation.

Features
User Authentication: User registration and login with password encryption.
Product Management: CRUD operations to manage products.
Cart Management: Users can add, update, and delete items in their cart.
Checkout: Simulate the checkout process.
Order Management: Users can view their past orders.
Swagger Documentation: Interactive API documentation with Swagger.
Technologies Used
Node.js: JavaScript runtime to run the server-side code.
Express: Web framework for building REST APIs.
Passport.js: Middleware for handling authentication.
Bcrypt.js: Library for hashing passwords.
PostgreSQL: Relational database to store user and product data.
Swagger: Tool for API documentation.
Prerequisites
Before running this project, make sure you have the following installed:

Node.js and npm (Node Package Manager)
PostgreSQL database
A code editor (e.g., Visual Studio Code)
A terminal/command prompt
Installation
Follow these steps to set up the project:

1. Clone the Repository
Clone the project repository to your local machine:

bash
Copy code
git clone https://github.com/yourusername/e-commerce-api.git
cd e-commerce-api
2. Install Dependencies
Run the following command to install the required npm packages:

bash
Copy code
npm install
3. Set Up the PostgreSQL Database
Ensure you have a PostgreSQL database set up. You will need to create the required tables for users, products, carts, orders, etc.

You can find the SQL scripts to create the necessary tables in the db/schema.sql file (you can create this file if it's not already available).

sql
Copy code
-- Example SQL schema for users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Example SQL schema for products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  category_id INT
);

-- Create other tables like carts, orders, etc. similarly.
4. Configure Environment Variables
You may need to configure your database connection settings in an .env file or directly in the database connection code.

For instance, create a .env file with the following content:

plaintext
Copy code
DB_HOST=localhost
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
PORT=3000
Then, ensure your db/db.js (or database connection file) uses these variables.

5. Run the Application
Now that everything is set up, you can start the server by running:

bash
Copy code
npm start
This will start the server on http://localhost:3000.

6. Access Swagger Documentation
To access the interactive Swagger API documentation, open your browser and go to:

bash
Copy code
http://localhost:3000/api-docs
This will display an interactive UI where you can view all the available API endpoints, their descriptions, request parameters, and response formats. You can also test the endpoints directly from this UI.

API Endpoints
User Routes
POST /api/users/register: Register a new user.
POST /api/users/login: Log in an existing user.
Product Routes
GET /api/products: Retrieve a list of products.
GET /api/products/{productId}: Get a product by ID.
POST /api/products: Add a new product (admin only).
PUT /api/products/{productId}: Update a product (admin only).
DELETE /api/products/{productId}: Delete a product (admin only).
Cart Routes
POST /api/cart: Create a new cart for the user.
POST /api/cart/{cartId}: Add a product to the user's cart.
GET /api/cart/{cartId}: View the cart details.
Checkout Routes
POST /api/checkout/{cartId}: Proceed with checkout (simulated).
Order Routes
GET /api/orders: View all orders placed by the logged-in user.
GET /api/orders/{orderId}: View details of a specific order.
Running Tests
You can run tests using a test suite like Jest or Mocha. Test setup will depend on your specific testing framework and is not included in this basic setup.

To install Jest for example:

bash
Copy code
npm install --save-dev jest
Then, run your tests:

bash
Copy code
npm test
Notes
Authentication: The login process is managed via Passport.js using the local strategy. This API requires the user to be authenticated via the login endpoint for certain actions (e.g., viewing orders).
Database: Ensure you have PostgreSQL set up correctly, and adjust database connection details if necessary in db/db.js.
Swagger Documentation: Each API route is documented using Swagger annotations, and you can modify these annotations as per your project's requirements.
Contributing
Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit your changes (git commit -m 'Add feature').
Push to the branch (git push origin feature-name).
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

To Add Swagger to Your Project
If you need to add Swagger to an existing project, follow these steps:

Install the necessary dependencies:

bash
Copy code
npm install swagger-jsdoc swagger-ui-express
Create the Swagger configuration file (e.g., swaggerConfig.js) as described above.

Integrate Swagger UI into your Express app by using swagger-ui-express in your app.js:

javascript
Copy code
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
Add Swagger annotations to your route and controller files to document the endpoints.