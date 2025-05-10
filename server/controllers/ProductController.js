const ProductDB = require("../models/ProductModel");
const ReviewDB = require('../models/reviewModel');
const mongoose = require('mongoose')

exports.getProducts = async (req, res) => {
  try {
    const { category, tag, search, limit } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (search) filter.name = { $regex: search, $options: 'i' };

    let query = ProductDB.find(filter).sort({ createdAt: -1 });

    if (limit) {
      const numericLimit = parseInt(limit);
      if (!isNaN(numericLimit)) {
        query = query.limit(numericLimit);
      }
    }

    const products = await query.exec();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { productId } = req.params;
  const userId = req.user.id; 
  const userName = req.user.name; 

  if (!userName) {
    return res.status(400).json({ message: 'User name is required.' });
  }

  if (rating === undefined || rating === null) {
    return res.status(400).json({ message: 'Rating is required.' });
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID.' });
  }

  try {
    const product = await ProductDB.findById(productId).populate({
      path: 'reviews',
      options: { sort: { createdAt: -1 } },
    });
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const review = await ReviewDB.create({
      user: userId,
      name: userName,
      rating: Number(rating),
      comment,
      product: productId,
    });

    product.reviews.push(review._id);

    const allReviews = await ReviewDB.find({ product: productId });

    product.numReviews = allReviews.length;
    product.rating =
      allReviews.reduce((acc, rev) => acc + rev.rating, 0) / allReviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added successfully.' });
  } catch (err) {
    console.error('Error in addReview:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};



exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, tags, stock ,brand } = req.body;
    const images = req.files?.map(file => file.path);
    if (!name || !description || !price || !category || !brand || !images || images.length === 0) {
      return res.status(400).json({ message: "All fields including images are required" });
    }

    const newProduct = new ProductDB({
      name,
      description,
      price,
      category,
      tags,
      brand,
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
      const product = await ProductDB.findOne({ _id: req.params.id }).populate('reviews');
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
    const { name, description, price, category, tags, stock , brand } = req.body;
    const images = req.files?.map(file => file.path); 

    const product = await ProductDB.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.brand = brand || product.brand;
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


