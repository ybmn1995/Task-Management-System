const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');

const app = express();

// ✅ CORS Configuration
app.use(cors({ origin: '*' }));
app.use(express.json());

// ✅ Function to Get Dynamic Base URL
const getServerUrl = (req) => {
  const protocol = req.protocol; // 'http' or 'https'
  const host = req.get('host'); // Current host (localhost:5000 or Render URL)
  return `${protocol}://${host}`;
};

// ✅ Swagger Configuration (Dynamic URL)
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for Task Management System',
    },
  },
  apis: ['./routes/*.js'], // Ensure Swagger scans all route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware to Dynamically Set the Server URL for Swagger UI
app.use('/swagger', (req, res, next) => {
  swaggerDocs.servers = [{ url: getServerUrl(req) }];
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Apply Authentication Middleware
app.use('/tasks', authMiddleware, tasksRouter);

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ Start Server with Dynamic URL Logging
app.listen(config.port, () => {
  const protocol = process.env.RENDER ? 'https' : 'http';
  const host = process.env.RENDER ? `task-management-system-kwt1.onrender.com` : `localhost:${config.port}`;
  const serverUrl = `${protocol}://${host}`;

  console.log(`✅ Server is running at ${serverUrl}`);
  console.log(`📄 Swagger API Docs: ${serverUrl}/swagger`);
});
