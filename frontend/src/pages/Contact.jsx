import React, { useState } from 'react';
import '../App.css';

import axios from "axios"

const Contact = () => {

  const [form,setForm]= useState({name:"",email:"",message:""})
  const [status, setStatus] = useState('');
  const token= localStorage.getItem("token")

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/contact`,form ,
        {headers:{Authorization:`Bearer ${token}`}}
      )
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message.');
    }
  }

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
        {status && <p>{status}</p>}
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
          <input type="email" name="email" value={form.email} onChange={handleChange}  placeholder="Your Email" required />
          <textarea rows="5" name="message" value={form.message} onChange={handleChange}  placeholder="Your Message" required></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
