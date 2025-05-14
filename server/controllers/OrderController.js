const orderDB = require("../models/OrderModel");

exports.createOrder = async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      shippingAddress,
      paymentIntentId,
      status, 
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one product." });
    }

    if (!shippingAddress || !totalAmount || !paymentIntentId || !status) {
      return res.status(400).json({ message: "Required order/payment data missing." });
    }

    const order = new orderDB({
      userId: req.user.id,
      products,
      totalAmount,
      shippingAddress,
      paymentIntentId,
      status,
      timestamp: new Date(),
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await orderDB
      .find({ userId: req.user.id })
      .populate('products.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderDB
      .find()
      .populate('products.productId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
