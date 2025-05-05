const express = require('express');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/ProductController');
const { verifyAdmin } = require('../middleware/AuthMiddleware.js');
const { verifyToken } = require('../middleware/AuthMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');
const router = express.Router();

router.get('/getproducts', getProducts);
router.post('/createproduct',verifyToken , verifyAdmin, upload.single('image'), createProduct); 
router.get('/getaproduct/:id',getProductById);
router.put("/updateProduct/:id", verifyToken, verifyAdmin,updateProduct);
router.delete("/deleteProduct/:id",verifyToken,verifyAdmin, deleteProduct);

module.exports = router;
