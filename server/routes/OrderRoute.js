const express = require('express');
const { verifyToken } = require('../middleware/AuthMiddleware.js');
const { createOrder, getUserOrders, getAllOrders } = require('../controllers/OrderController');
const { verifyAdmin } = require('../middleware/AuthMiddleware.js');
const router = express.Router();

router.post('/createorder', verifyToken, createOrder);
router.get('/getuserorders', verifyToken, getUserOrders);
router.get('/getAllOrders', verifyAdmin, getAllOrders);

module.exports = router;
