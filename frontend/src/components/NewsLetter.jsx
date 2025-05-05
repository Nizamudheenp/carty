import React from 'react';
import '../App.css'
const NewsLetter = () => {
  return (
    <section id="newsletter" className="section-p1 section-m1">
    <div className="newstext">
      <h4>Sign up for newsletters</h4>
      <p>
        Get Email Updates About Our Shop And <span>Special Offers</span>
      </p>
    </div>
    <div className="form">
      <input type="text" placeholder="Your Email Address" />
      <button className="normal">Sign Up</button>
    </div>
  </section>
  );
};

export default NewsLetter;
