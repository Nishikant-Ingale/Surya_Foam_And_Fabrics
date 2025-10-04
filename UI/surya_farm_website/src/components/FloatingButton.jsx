// src/components/FloatingButton.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';
import FeedbackForm from './FeedbackForm';
import '../styles/FloatingButton.css';

const FloatingButton = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // useRef to hold the timer IDs
  const timers = useRef({});

  useEffect(() => {
    // A function to handle the entire prompt cycle
    const startPromptCycle = () => {
      // Show the prompt
      setShowPrompt(true);
      
      // Schedule the prompt to hide after 30 seconds
      timers.current.hide = setTimeout(() => {
        setShowPrompt(false);
        // After hiding, schedule the next prompt to appear in 5 seconds
        timers.current.show = setTimeout(startPromptCycle, 5000); 
      }, 30000);
    };

    // Start the initial cycle after a short delay (e.g., 15 seconds)
    // This delay prevents the prompt from appearing right away on page load
    timers.current.initial = setTimeout(startPromptCycle, 15000);

    // Cleanup function to clear all timers when the component unmounts
    return () => {
      clearTimeout(timers.current.initial);
      clearTimeout(timers.current.hide);
      clearTimeout(timers.current.show);
    };
  }, []);

  const handleFeedbackClick = () => {
    setShowPrompt(false);
    setShowForm(true);
    // Clear all timers so the prompt doesn't pop up while the form is open
    clearTimeout(timers.current.initial);
    clearTimeout(timers.current.hide);
    clearTimeout(timers.current.show);
  };

  const handleClosePrompt = () => {
    setShowPrompt(false);
    // Clear the auto-hide timer to prevent it from re-running
    clearTimeout(timers.current.hide);
    // Schedule the next prompt to appear sooner since the user manually closed it
    timers.current.show = setTimeout(startPromptCycle, 5000); 
  };

  const closeForm = () => {
    setShowForm(false);
    // Restart the prompt cycle after the form is closed
    // This provides a smooth user experience
    startPromptCycle();
  };

  const whatsappNumber = '919890199201';
  const whatsappMessage = encodeURIComponent("Hello Surya Farm! I want to inquire about your products.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const instagramLink = 'https://www.instagram.com/suryafarms';

  return (
    <>
      {/* The floating message prompt */}
      <div className={`feedback-prompt-container ${showPrompt ? 'show' : ''}`}>
        <p onClick={handleFeedbackClick}>Have a moment? We’d love your feedback! 📝</p>
        <button className="prompt-close-button" onClick={handleClosePrompt}>
          <X size={16} />
        </button>
      </div>

      {/* The dedicated feedback button (simple icon) */}
      <button className="floating-button feedback" onClick={handleFeedbackClick}>
        <MessageSquare size={35} color="#fff" />
      </button>

      {/* WhatsApp & Instagram Buttons (no change) */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="floating-button whatsapp">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp" />
      </a>
      <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="floating-button instagram">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
      </a>
    
      {/* The Feedback Form Pop-up */}
      {showForm && (
        <div className="feedback-form-container">
          <button className="close-button" onClick={closeForm}>
            <X size={24} />
          </button>
          <FeedbackForm onClose={closeForm} />
        </div>
      )}
    </>
  );
};

export default FloatingButton;