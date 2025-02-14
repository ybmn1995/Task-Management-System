const config = require('../config'); // For Inculde API Key from config

module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key'); // Extract API key from headers

  if (!apiKey) {
    return res.status(401).json({ error: "Unauthorized: No API key provided" });
  }

  if (apiKey !== config.apiKey) {
    return res.status(403).json({ error: "Forbidden: Invalid API key" });
  }

  next(); // Proceed to next middleware/route handler
};
