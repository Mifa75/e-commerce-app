const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specify OpenAPI version
    info: {
      title: 'E-commerce API', // Title of the API
      version: '1.0.0', // API version
      description: 'API documentation for the E-commerce application',
    },
  },
  // Path to the API routes that should be documented
  apis: ['./routes/*.js', './controllers/*.js'], // Path to your route and controller files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
