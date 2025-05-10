const CartDB = require("../models/CartModel")

exports.getCart = async (req, res) => {
  const cart = await CartDB.findOne({ user: req.user.id }).populate("items.product");
  res.json(cart || { user: req.user.id, items: [] });
};
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await CartDB.findOne({ user: req.user.id });

  if (!cart) cart = new CartDB({ user: req.user.id, items: [] });

  const existing = cart.items.find(item => item.product.toString() === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
};

exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await CartDB.findOne({ user: req.user.id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(i => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: "Item not in cart" });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const cart = await CartDB.findOne({ user: req.user.id });

  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await cart.save();
  res.json(cart);
};

exports.clearCart = async (req, res) => {
  const cart = await CartDB.findOne({ user: req.user.id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.json({ message: "Cart cleared" });
};
