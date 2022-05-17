const express = require('express')
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductBySearch} = require('../controllers/product.controller');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.post('/product', createProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/products/search', getProductBySearch);

module.exports = router;