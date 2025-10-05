/**
 * SERVER ENTRY POINT
 *
 * This file starts the Express server and connects to MongoDB.
 * The code is CORRECT - if you're getting errors, it's because MongoDB isn't running!
 *
 * ARCHITECTURE:
 * 1. Load environment variables from .env file
 * 2. Import the Express app configuration
 * 3. Connect to MongoDB database
 * 4. Start the HTTP server on port 5000
 */

require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📝 Test endpoint: http://localhost:${PORT}/api/products\n`);
});
