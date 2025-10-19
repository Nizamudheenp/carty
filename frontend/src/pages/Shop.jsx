import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Product = ({ image, brand, title, price, rating, numReviews, onClick }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = rating - fullStars >= 0.5;

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
      <img src={image} alt={title} />
      <div className="des">
        <span>{brand}</span>
        <h5>{title}</h5>
        <div className="star">
          {renderStars()}
          <span style={{ marginLeft: '6px', fontSize: '12px', color: '#666' }}>
            ({numReviews || 0})
          </span>
        </div>
        <h4>₹ {price}</h4>
      </div>
    </div>
  );
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="section-p1">
        <h2>Loading products...</h2>
      </section>
    );
  }

  return (
    <section id="Product-1" className="section-p1">
      <div className="pro-container">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              image={product.images?.[0] || '/placeholder.jpg'}
              brand={product.brand || 'Brand'}
              title={product.name}
              price={product.price}
              rating={product.rating}
              numReviews={product.numReviews}
              onClick={() => navigate(`/product/${product._id}`)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Shop;
