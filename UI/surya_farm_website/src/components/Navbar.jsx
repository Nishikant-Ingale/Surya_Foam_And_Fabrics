import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img 
          src={logo} 
          alt="Surya Farms Logo"
          style={{ width: '180px', height: '60px', objectFit: 'contain' }}
        />
      </Link>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/ui/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/ui/products" onClick={closeMenu}>Products</Link></li>
          <li><Link to="/ui/gallery" onClick={closeMenu}>Gallery</Link></li>
          <li><Link to="/ui/testimonials" onClick={closeMenu}>Testimonials</Link></li>
          <li><Link to="/ui/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'rotate-top' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'hide-middle' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'rotate-bottom' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
