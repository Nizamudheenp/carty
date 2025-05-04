const ProductDB = require("../models/ProductModel")

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductDB.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new ProductDB(req.body);
    const products = await newProduct.save();
    res.status(201).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


