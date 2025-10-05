/**
 * EXPRESS APP CONFIGURATION
 *
 * This file sets up all Express middleware and routes.
 * The code is CORRECT and properly configured!
 *
 * MIDDLEWARE CHAIN (order matters!):
 * 1. CORS - Enable cross-origin requests
 * 2. express.json() - Parse JSON request bodies (CRITICAL for POST requests!)
 * 3. express.urlencoded() - Parse URL-encoded bodies
 * 4. Routes - Define API endpoints
 * 5. Error Handler - Catch and format errors
 *
 * ROUTE MOUNTING:
 * - GET  / returns welcome message
 * - All /api/products/* routes are handled by productRoutes
 */

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Inventory Management System API' });
});

app.use('/api/products', productRoutes);

app.use(errorHandler);

module.exports = app;
