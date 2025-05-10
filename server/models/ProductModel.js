const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String },
  brand: { type: String },
  tags: [String],
  stock: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
