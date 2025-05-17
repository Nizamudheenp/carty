import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const handleClick  = ()=>{
    navigate('/shop')
  }
  return (
    <section id="Hero">
      <h4>Trade-In-Offer</h4>
      <h2>Super Value Deals</h2>
      <h1>On All Products</h1>
      <p>Save More With Coupons & Upto 70% Off</p>
      <button onClick={handleClick}>Shop Now</button>
    </section>
  );
};

export default Hero;
