const express = require('express');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct, getFeaturedProducts, addReview } = require('../controllers/ProductController');
const { verifyAdmin } = require('../middleware/AuthMiddleware.js');
const { verifyToken } = require('../middleware/AuthMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/CartController.js');
const router = express.Router();

router.get('/getproducts', getProducts);
router.post('/addreview/:productId', verifyToken, addReview);
router.post('/createproduct',verifyToken , verifyAdmin, upload.array('images',5), createProduct); 
router.get('/getaproduct/:id',getProductById);
router.get('/getfeaturedproducts',getFeaturedProducts)
router.put("/updateProduct/:id", verifyToken, verifyAdmin,updateProduct);
router.delete("/deleteProduct/:id",verifyToken,verifyAdmin, deleteProduct);

router.get("/getCart", verifyToken, getCart);
router.post("/addToCart", verifyToken, addToCart);
router.put("/updateCartItem", verifyToken, updateCartItem);
router.delete("/removeFromCart/:productId", verifyToken, removeFromCart);
router.delete("/clearCart", verifyToken, clearCart);

module.exports = router;
