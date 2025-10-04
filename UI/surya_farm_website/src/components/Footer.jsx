import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Surya Farms</h3>
          <p>Bringing you the freshest farm products with love and care.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📞 +91-9890199201</p>
          <p>📧 suryafoam933@yahoo.in</p>
          <p>📍 Chalisgoan, Maharashtra, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Surya Farms. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
