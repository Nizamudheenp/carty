const express = require('express');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct, getFeaturedProducts } = require('../controllers/ProductController');
const { verifyAdmin } = require('../middleware/AuthMiddleware.js');
const { verifyToken } = require('../middleware/AuthMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');
const router = express.Router();

router.get('/getproducts', getProducts);
router.post('/createproduct',verifyToken , verifyAdmin, upload.array('images',5), createProduct); 
router.get('/getaproduct/:id',getProductById);
router.get('/getfeaturedproducts',getFeaturedProducts)
router.put("/updateProduct/:id", verifyToken, verifyAdmin,updateProduct);
router.delete("/deleteProduct/:id",verifyToken,verifyAdmin, deleteProduct);

module.exports = router;
