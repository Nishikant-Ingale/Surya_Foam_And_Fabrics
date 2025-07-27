import React from 'react';
import '../styles/FloatingButton.css';

const FloatingButton = () => {
  const whatsappNumber = '919999999999'; // Replace with real WhatsApp number
  const whatsappMessage = encodeURIComponent("Hello Surya Farms! I want to inquire about your products.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const instagramLink = 'https://www.instagram.com/suryafarms'; // Replace with real Insta URL

  return (
    <>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="floating-button whatsapp">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp" />
      </a>

      <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="floating-button instagram">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
      </a>
    </>
  );
};

export default FloatingButton;
