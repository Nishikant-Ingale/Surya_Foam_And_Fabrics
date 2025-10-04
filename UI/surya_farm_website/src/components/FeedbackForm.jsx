// src/components/FeedbackForm.jsx
import React, { useState } from 'react';
import { Star } from 'lucide-react';

const FeedbackForm = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const feedbackData = {
      rating: rating,
      feedback: feedback,
    };

    try {
      const response = await fetch('YOUR_SPRING_BOOT_API_URL/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you for your feedback!' });
        setRating(0);
        setFeedback('');
        setTimeout(onClose, 2000); // Close the form after a successful submission
      } else {
        setStatus({ type: 'error', message: 'Failed to submit feedback. Please try again.' });
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      setStatus({ type: 'error', message: 'Something went wrong. Please check your network connection.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2 className="form-title">Leave Us a Feedback</h2>
      <div className="rating-container">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <Star
              key={index}
              size={32}
              className={`star ${ratingValue <= rating ? 'filled' : ''}`}
              onClick={() => handleRating(ratingValue)}
            />
          );
        })}
      </div>
      <textarea
        placeholder="Tell us about your experience..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows="4"
        className="feedback-textarea"
        required
      />
      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Feedback'}
      </button>
      {status && (
        <p className={`status-message ${status.type}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default FeedbackForm;