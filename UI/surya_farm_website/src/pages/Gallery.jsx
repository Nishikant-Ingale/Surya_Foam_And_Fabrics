import React from 'react';
import '../styles/Gallery.css';

const Gallery = () => {
  return (
    <div className="gallery-page">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {/* Add your images here */}
        <div className="gallery-item">Image 1</div>
        <div className="gallery-item">Image 2</div>
        <div className="gallery-item">Image 3</div>
      </div>
    </div>
  );
};

export default Gallery;