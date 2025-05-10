import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const ProductCard = ({ product, onClick }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating || 0);
    const hasHalfStar = product.rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half"></i>);
    }

    while (stars.length < 5) {
      stars.push(<i key={`empty-${stars.length}`} className="bi bi-star"></i>);
    }

    return stars;
  };

  return (
    <div className="pro" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} />
      <div className="des">
        <span>{product.brand || 'Brand'}</span>
        <h5>{product.name}</h5>
        <div className="star">
          {renderStars()}
          <span style={{ marginLeft: '6px', fontSize: '12px', color: '#666' }}>
            ({product.numReviews || 0})
          </span>
        </div>
        <h4>₹ {product.price}</h4>
      </div>
    </div>
  );
};

const ProductCollection = ({ title, tag, category, search, limit }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (tag) queryParams.append('tag', tag);
        if (category) queryParams.append('category', category);
        if (search) queryParams.append('search', search);
        if (limit) queryParams.append('limit', limit);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts?${queryParams.toString()}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [tag, category, search, limit]);

  if (!products.length) return null;

  return (
    <section className="section-p1" id="Product-1">
      <h2>{title}</h2>
      <p>Explore our latest selection</p>
      <div className="pro-container">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={() => navigate(`/product/${product._id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCollection;
