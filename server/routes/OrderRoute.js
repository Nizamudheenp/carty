const express = require('express');
const { verifyToken } = require('../middleware/AuthMiddleware.js');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/OrderController');
const { verifyAdmin } = require('../middleware/AuthMiddleware.js');
const { createPaymentIntent } = require('../controllers/PaymentController.js');
const router = express.Router();

router.post('/createorder', verifyToken, createOrder);
router.get('/getuserorders', verifyToken, getUserOrders);
router.get('/getAllOrders',verifyToken, verifyAdmin, getAllOrders);
router.post('/create-payment-intent', createPaymentIntent);
router.patch('/updateorderstatus/:id',verifyToken, verifyAdmin, updateOrderStatus);

module.exports = router;
