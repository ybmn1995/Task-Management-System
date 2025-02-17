const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true); // Allows all origins dynamically
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true, // Allows credentials (cookies, authentication headers, etc.)
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

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

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(config.port, () => {
  console.log(`✅ Server is running at http://localhost:${config.port}`);
  console.log(`📄 Swagger API Docs: http://localhost:${config.port}/swagger`);
});
