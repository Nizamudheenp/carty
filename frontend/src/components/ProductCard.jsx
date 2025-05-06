import React from 'react';
import "../pages/pages.css"
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.images[0]}
        alt={product.name}
        className="product-card-img"
      />
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-price">₹{product.price}</p>
        <button className="product-card-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
