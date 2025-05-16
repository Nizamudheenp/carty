import React from 'react';
import '../App.css'
const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src="/images/logo1.jpg" alt="Logo" />
        <h4>Contact</h4>
        <p><strong>Address:</strong> Dwaraka road , Wayanad ,Kerala</p>
        <p><strong>Phone:</strong> +91 8921041795 / +91 24356787</p>
        <p><strong>Hours:</strong> 10.00 - 10.00, Mon - Sat</p>
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
        <a href="#">About Us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy & Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="col">
        <h4>Account</h4>
        <a href="#">My Account</a>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>App Store or Google Play</p>
        <div className="row">
          <img src="/images/appstore.jpg" alt="App Store" />
          <img src="/images/play store.jpg" alt="Play Store" />
        </div>
        <p>Secured Payment Gateway</p>
        <img src="/images/appstore.jpg" alt="Payment Gateway" />
      </div>

      <div className="copyright">
        <p>© 2021, Tech2 etc - HTML CSS Ecommerce Website</p>
      </div>
    </footer>
  );
};

export default Footer;
