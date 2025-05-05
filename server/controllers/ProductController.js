const ProductDB = require("../models/ProductModel");

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductDB.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file?.path;
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: "all fields are required" })
  }

    const newProduct = new ProductDB({
      name,
      description,
      price,
      category,
      image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
      const product = await ProductDB.findOne({ _id: req.params.id });
      if (!product) {
          res.status(404).json({ message: "product not found" })
      }
      return res.status(201).json(product);
  } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
  }
}

exports.updateProduct = async (req, res) => {
  try {
      const { name, description, price, category, image , stock } = req.body

      const product = await ProductDB.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" })
      product.name = name
      product.description = description
      product.price = price
      product.category = category
      product.image = image
      product.stock = stock

      const newproduct = await product.save();
      res.status(201).json(newproduct);

  } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
  }
}

exports.deleteProduct = async (req, res) => {
  try {
      const product = await ProductDB.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" })

      await product.deleteOne()
      res.json({ message: "Product deleted" })

  } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
  }
}


