import React from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
const Banner = () => {
  const navigate = useNavigate();

  const handleClick  = ()=>{
    navigate('/shop')
  }
  return (
    <section id="banner" className="section-m1">
      <h4>Repair Service</h4>
      <h2>Upto <span>70% Off</span> - All T-shirt And Accessories</h2>
      <button className="normal" onClick={handleClick}>Explore More</button>
    </section>
  );
};

export default Banner;
