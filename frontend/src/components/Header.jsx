import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <section id="header">
      <a href="#"><img src="\images\logo1.jpg" className="log" alt="" /></a>
      <div>
        <ul id="navbar">
          <li><Link className="active" to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li id="lg-bag"><Link to="/cart"><i className="bi bi-cart2"></i></Link></li>
          <a href="#" id="close"><i className="bi bi-x-lg"></i></a>
        </ul>
      </div>
      <div id="mobile">
        <Link to="/cart"><i className="bi bi-cart2"></i></Link>
        <i id="bar" className="bi bi-list"></i>
      </div>
    </section>
  );
};

export default Header