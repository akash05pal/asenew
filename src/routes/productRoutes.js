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
