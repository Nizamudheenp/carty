import React from 'react';
import '../App.css'
const Feature = () => {
  return (
    <section id="feature" className="section-p1">
      <div className="fe-box">
        <img src="/images/b.jpg" alt="feature image" />
        <h6>Free Shipping</h6>
      </div>
      <div className="fe-box">
        <img src="/images/p.jpg" alt="feature image" />
        <h6>Online Order</h6>
      </div>
      <div className="fe-box">
        <img src="/images/q.jpg" alt="feature image" />
        <h6>Save Money</h6>
      </div>
      <div className="fe-box">
        <img src="/images/o.jpg" alt="feature image" />
        <h6>Promotions</h6>
      </div>
      <div className="fe-box">
        <img src="/images/n.jpg" alt="feature image" />
        <h6>Happy Sell</h6>
      </div>
      <div className="fe-box">
        <img src="/images/t.jpg" alt="feature image" />
        <h6>24/7 Support</h6>
      </div>
    </section>
  );
};

export default Feature;
