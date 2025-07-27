import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const reviews = [
    { id: 1, name: 'John Doe', feedback: 'Excellent quality and service!' },
    { id: 2, name: 'Jane Smith', feedback: 'Highly recommend Surya Foams!' },
  ];

  return (
    <div className="testimonials-page">
      <h1>Testimonials</h1>
      <div className="testimonials-grid">
        {reviews.map((review) => (
          <div className="testimonial-card" key={review.id}>
            <h3>{review.name}</h3>
            <p>{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
