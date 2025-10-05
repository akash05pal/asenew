/**
 * PRODUCT ROUTES
 *
 * Defines all API endpoints for product management.
 * The code is CORRECT and follows RESTful conventions!
 *
 * IMPORTANT: Route order matters!
 * - '/low-stock' must come BEFORE '/:id' to avoid conflicts
 * - Otherwise, 'low-stock' would be treated as an ID parameter
 *
 * ENDPOINTS (all prefixed with /api/products):
 * - POST   /                  → Create new product
 * - GET    /                  → Get all products
 * - GET    /low-stock         → Get products below threshold
 * - GET    /:id               → Get product by ID
 * - PUT    /:id               → Update product
 * - DELETE /:id               → Delete product
 * - PATCH  /:id/increase      → Increase stock quantity
 * - PATCH  /:id/decrease      → Decrease stock quantity
 */

const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
  getLowStockProducts,
} = require('../controllers/productController');

router.get('/low-stock', getLowStockProducts);

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.patch('/:id/increase', increaseStock);
router.patch('/:id/decrease', decreaseStock);

module.exports = router;
