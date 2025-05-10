import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../pages/pages.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState(null);

    const getUserFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload;
        } catch {
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userData = getUserFromToken();
            setUser(userData);

            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getaproduct/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/addreview/${id}`,
                { rating, comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Review submitted successfully');
            setRating(0);
            setComment('');
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getaproduct/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Failed to submit review');
        }
    };
    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/addToCart`,
            { productId: product._id, quantity: 1 },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Added to cart!");
    };


    const getAverageRating = (reviews = []) => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        return total / reviews.length;
    };

    const renderStars = (ratingValue, interactive = false) => {
        const stars = [];
        const rounded = Math.round(ratingValue * 2) / 2;
        for (let i = 1; i <= 5; i++) {
            let starClass = 'bi-star';
            if (i <= rounded) {
                starClass = 'bi-star-fill';
            } else if (i - 0.5 === rounded) {
                starClass = 'bi-star-half';
            }

            stars.push(
                <i
                    key={i}
                    className={`bi ${starClass} ${interactive ? 'clickable-star' : ''}`}
                    onClick={() => {
                        if (interactive) {
                            setRating(i);
                        }
                    }}
                    style={{
                        cursor: interactive ? 'pointer' : 'default',
                        color: 'gold',
                        fontSize: '20px',
                    }}
                />
            );
        }
        return stars;
    };

    if (loading) return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;
    if (!product) return <h2 style={{ textAlign: 'center' }}>Product not found</h2>;

    return (
        <div className="product-details section-p1">
            <div className="product-image">
                <img src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} />
            </div>

            <div className="product-info">
                <h2>{product.name}</h2>
                <h4>Brand: {product.brand}</h4>

                <div className="rating-stars">
                    {renderStars(getAverageRating(product.reviews))}
                    <span style={{ marginLeft: '8px', fontSize: '14px' }}>
                        ({product.numReviews || 0} reviews)
                    </span>
                </div>

                <p>{product.description || 'No description available.'}</p>
                <h3>₹ {product.price}</h3>
                <button className="btn" onClick={handleAddToCart}>Add to Cart</button>

                {user && (
                    <div className="review-form" style={{ marginTop: '30px' }}>
                        <h4>Write a Review</h4>
                        <div style={{ marginBottom: '10px' }}>
                            {renderStars(rating, true)}
                        </div>
                        <form onSubmit={handleSubmitReview}>
                            <label>Comment:</label>
                            <textarea
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>
                            <button type="submit" className="btn">Submit Review</button>
                        </form>
                    </div>
                )}

                <div className="all-reviews" style={{ marginTop: '30px' }}>
                    <h4>User Reviews</h4>
                    {product.reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        product.reviews.map((rev) => (
                            <div key={rev._id} className="review-card">
                                <strong>{rev.name}</strong>
                                <div>{renderStars(rev.rating)}</div>
                                <p>{rev.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
