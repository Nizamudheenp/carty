import React from 'react';
import '../App.css';

const Contact = () => {
  return (
    <section className="contact-page section-p1">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>We're here to help and answer any question you might have. We look forward to hearing from you! 😊</p>

        <div className="contact-details">
          <p><strong>📍 Address:</strong> Dwaraka road, Wayanad, kerala ,India</p>
          <p><strong>📞 Phone:</strong> +91 8921041795/ +91 24356787</p>
          <p><strong>⏰ Working Hours:</strong> 10.00 AM - 10.00 PM, Monday - Saturday</p>
          <p><strong>📧 Email:</strong> support@carty.com</p>

          <div className="social-icons">
            <h4>Follow Us</h4>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-whatsapp"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-pinterest"></i>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <h3>Send Us a Message</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
