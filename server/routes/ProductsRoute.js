const express = require('express');
const { getProducts, createProduct } = require('../controllers/ProductController');
const { verifyAdmin } = require('../middleware/AuthMiddleware');
const { verifyToken } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.get('/getproducts', getProducts);
router.post('/createproduct',verifyToken , verifyAdmin, createProduct); 

module.exports = router;
