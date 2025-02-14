require('dotenv').config();

const config = {
  apiKey: process.env.API_KEY || "default-api-key", // Fetch API key from environment variables
  port: process.env.PORT || 5000, // Fetch port from env (default: 5000)
};

module.exports = config;
