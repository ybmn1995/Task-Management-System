const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authMiddleware = require('./middleware/auth');
const config = require('./config'); // Import config file

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for Task Management System',
    },
    servers: [{ url: `http://localhost:${config.port}` }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Apply Authentication Middleware
app.use('/tasks', authMiddleware, tasksRouter);

app.listen(config.port, () => {
  console.log(`✅ Server is running at http://localhost:${config.port}`);
  console.log(`📄 Swagger API Docs: http://localhost:${config.port}/swagger`);
});


const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
