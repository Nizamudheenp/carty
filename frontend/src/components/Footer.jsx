import React from 'react';
import '../App.css'

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src="/images/ChatGPT Image May 16, 2025, 10_31_34 AM.png" alt="Logo" />
        <h4>Contact</h4>
        <p><strong>Address :</strong> Wayanad ,Kerala</p>
        <p><strong>Phone :</strong> +91 8921041725 / +91 24356787</p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-whatsapp"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-pinterest"></i>
          </div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <a href="/about">About Us</a>
        <a href="/coming-soon">Delivery Information</a>
        <a href="/coming-soon">Privacy & Policy</a>
        <a href="/coming-soon">Terms & Conditions</a>
        <a href="/contact">Contact Us</a>
      </div>

      <div className="col">
        <h4>Account</h4>
        <a href="/coming-soon">My Account</a>
        <a href="/coming-soon">Sign In</a>
        <a href="/coming-soon">View Cart</a>
        <a href="/coming-soon">Track My Order</a>
        <a href="/coming-soon">Help</a>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>App Store or Google Play</p>
        <div className="row">
          <img src="/images/appstore.jpg" alt="App Store" />
          <img src="/images/play store.jpg" alt="Play Store" />
        </div>
        <p>Secured Payment Gateway</p>
        <img src="/images/Stripe.png" alt="Payment Gateway" />
      </div>

      <div className="copyright">
        <p>© {currentYear} Carty — Ecommerce Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
