
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showToast } from "../utils/toast";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(images).forEach(image => formData.append('images', image));
  
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('brand',brand);
    formData.append('category', category);
    formData.append('tags', tags);
  
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/createproduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoading(false);
      showToast('success', 'Product added successfully!');
      setTimeout(() => {
           navigate('/admin/dashboard');
      }, 1000);

    } catch (error) {
      setLoading(false);
      showToast('error', 'Error adding product');
    }
  };
  
  return (
    <div className="add-product-page">
      <h1 className="add-product-title">Add New Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="add-product-input">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="add-product-field"
          />
        </div>
        <div className="add-product-input">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="add-product-field"
          />
        </div>
        <div className="add-product-input">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="add-product-field"
          />
        </div>
        <div className="add-product-input">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="add-product-field"
          />
        </div>
        <div className="add-product-input">
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="add-product-field"
          />
        </div>
        <div className="add-product-input">
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="add-product-field"
          />
        </div>
        <div className="add-product-input">
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            required
            className="add-product-field"
          />
        </div>
        <button type="submit" className="add-product-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
