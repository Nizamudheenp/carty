import React from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const SmallBanner = () => {
  const navigate = useNavigate();
  const handleClick  = ()=>{
    navigate('/shop')
  }
  return (
    <section id="sm-banner" className="section-p1">
      <div className="banner-box">
        <h4>Crazy Deals</h4>
        <h2>By 1 Get 1 free</h2>
        <span>The Best Classic Dress Is On Sale At Cara</span>
        <button className="white" onClick={handleClick}>Learn More</button>
      </div>
      <div className="banner-box">
        <h4>Spring/Summer</h4>
        <h2>Upcoming season</h2>
        <span>The Best Classic Dress Is On Sale At Cara</span>
        <button className="white" onClick={handleClick}>Collection</button>
      </div>
    </section>
  );
};

export default SmallBanner;
