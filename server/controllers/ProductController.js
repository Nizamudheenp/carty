const ProductDB = require("../models/ProductModel");


exports.getProducts = async (req, res) => {
  try {
    const { category, tag, search } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const products = await ProductDB.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, tags, stock  } = req.body;
    const images = req.files?.map(file => file.path);
    if (!name || !description || !price || !category || !images || images.length === 0) {
      return res.status(400).json({ message: "All fields including images are required" });
    }

    const newProduct = new ProductDB({
      name,
      description,
      price,
      category,
      tags,
      stock,
      images
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

exports.getFeaturedProducts = async (req, res) => {
  try {
    const featured = await ProductDB.find({ tags: "featured" }).limit(10);
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, tags, stock } = req.body;
    const images = req.files?.map(file => file.path); // For multiple image update

    const product = await ProductDB.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.tags = tags || product.tags;
    product.stock = stock ?? product.stock;
    if (images && images.length > 0) product.images = images;

    const updated = await product.save();
    res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


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


