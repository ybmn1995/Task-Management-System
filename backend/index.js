const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');

const app = express();

// ✅ Fix CORS Issues
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: false, // Must be false if using `origin: '*'`
};

// Apply CORS middleware properly
app.use(cors(corsOptions));
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
  res.sendStatus(204); // Respond with 'No Content' for preflight requests
});

app.use(express.json());

// ✅ Swagger Configuration
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

// ✅ Apply Authentication Middleware
app.use('/tasks', authMiddleware, tasksRouter);

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ Start Server
app.listen(config.port, () => {
  console.log(`✅ Server is running at http://localhost:${config.port}`);
  console.log(`📄 Swagger API Docs: http://localhost:${config.port}/swagger`);
});
