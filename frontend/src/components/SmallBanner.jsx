import React from 'react';
import '../App.css'
const SmallBanner = () => {
  return (
    <section id="sm-banner" className="section-p1">
      <div className="banner-box">
        <h4>Crazy Deals</h4>
        <h2>By 1 Get 1 free</h2>
        <span>The Best Classic Dress Is On Sale At Cara</span>
        <button className="white">Learn More</button>
      </div>
      <div className="banner-box">
        <h4>Spring/Summer</h4>
        <h2>Upcoming season</h2>
        <span>The Best Classic Dress Is On Sale At Cara</span>
        <button className="white">Collection</button>
      </div>
    </section>
  );
};

export default SmallBanner;
