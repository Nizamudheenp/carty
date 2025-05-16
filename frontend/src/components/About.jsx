import React from 'react';

const About = () => {
  return (
    <section className="about-section" style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.heading}>About Carty</h1>
        <p style={styles.text}>
          Welcome to <strong>Carty</strong> – your one-stop destination for seamless online shopping. 
          Founded in 2025, Carty was born out of a simple idea: to make online shopping easier, faster, 
          and more enjoyable for everyone.
        </p>

        <h2 style={styles.subheading}>Our Journey</h2>
        <p style={styles.text}>
          What started as a small idea between a few passionate entrepreneurs is now one of the fastest-growing 
          online marketplaces. From fashion and electronics to home essentials and unique handmade crafts, 
          Carty brings together millions of products from trusted sellers across the country.
        </p>

        <h2 style={styles.subheading}>Why Carty?</h2>
        <ul style={styles.list}>
          <li>Wide selection of quality products at competitive prices</li>
          <li>Secure payments and fast delivery</li>
          <li>User-friendly platform designed with you in mind</li>
          <li>24/7 customer support to help you with anything</li>
        </ul>

        <h2 style={styles.subheading}>Our Vision</h2>
        <p style={styles.text}>
          To redefine e-commerce by creating an ecosystem that empowers both customers and sellers. 
          We believe in transparent practices, reliable service, and giving our users the freedom to 
          shop on their own terms.
        </p>

        <h2 style={styles.subheading}>Meet the Team</h2>
        <p style={styles.text}>
          Our team is a mix of dreamers, developers, designers, and customer champions. 
          We work around the clock to make sure Carty stays fast, secure, and reliable — 
          so that every order, every delivery, and every click brings satisfaction.
        </p>

        <h2 style={styles.subheading}>Join Our Journey</h2>
        <p style={styles.text}>
          Whether you're a customer looking for the best deals, or a seller wanting to grow your business, 
          Carty is here for you. We’re just getting started, and the best is yet to come.
        </p>

        <p style={{ ...styles.text, marginTop: '2rem' }}>
          <strong>Thank you for choosing Carty.</strong> Let’s build something great together.
        </p>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '4rem 2rem',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Segoe UI, sans-serif',
    lineHeight: 1.7,
  },
  container: {
    maxWidth: '960px',
    margin: 'auto',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#222',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.8rem',
    color: '#333',
    marginTop: '2rem',
  },
  text: {
    fontSize: '1.1rem',
    color: '#555',
  },
  list: {
    paddingLeft: '1.5rem',
    color: '#555',
    fontSize: '1.1rem',
    lineHeight: '1.8',
  },
};

export default About;
