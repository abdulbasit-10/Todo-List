// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'Todo List API docs (Express + swagger-jsdoc)',
    },
    servers: [
      { url: process.env.SWAGGER_SERVER || 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '65123abc...' },
            task: { type: 'string', example: 'Buy groceries' },
            priority: { type: 'string', example: 'high' },
            status: { type: 'string', example: 'pending' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          },
          required: ['task', 'priority', 'status']
        },
        TodoInput: {
          type: 'object',
          properties: {
            task: { type: 'string', example: 'Read a book' },
            priority: { type: 'string', example: 'medium' },
            status: { type: 'string', example: 'in-progress' }
          },
          required: ['task', 'priority', 'status']
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Task deleted successfully' },
            data: { type: 'object' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);
