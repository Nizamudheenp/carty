import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { showToast } from "../utils/toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/deleteProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast('success', 'deletion successful');
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="admin-dashboard-page">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <button className="admin-add-product-button" onClick={() => navigate('/admin/add-product')}>Add New Product</button>
      <div className="admin-products-list">
        {products.map((product) => (
          <div key={product._id} className="admin-product-card">
            <h3 className="admin-product-name">{product.name}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
            <div className="admin-product-images">
              <strong>Images:</strong>
              {product.images.length > 0 ? (
                <div className="admin-images-gallery">
                  {product.images.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Product Image ${index + 1}`} className="admin-product-image" />
                  ))}
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="admin-product-actions">
              <button className="admin-edit-button" onClick={() => navigate(`/admin/edit-product/${product._id}`)}>Edit</button>
              <button className="admin-delete-button" onClick={() => deleteProduct(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
