import React, { useState, useEffect } from 'react';

const SmartImage = ({ src, alt, className }) => {
  // Start with the default image.
  // This ensures that if 'src' is invalid, the fallback is shown immediately.
  const [imageSrc, setImageSrc] = useState('/images/default-product-image.jpeg');
  const [loaded, setLoaded] = useState(false); // To track if the actual image has loaded

  useEffect(() => {
    // Reset state when 'src' prop changes
    setImageSrc('/images/products/default-product-image.jpeg');
    setLoaded(false);

    const img = new Image();
    img.src = src; // Attempt to load the actual image

    const handleLoad = () => {
      // Check for success: img.complete and a valid naturalWidth (not 0)
      if (img.complete && img.naturalWidth !== 0) {
        setImageSrc(src); // Only update to the actual src if it loaded successfully
        setLoaded(true);
      } else {
        // If it completes but is still invalid (e.g., malformed but not an explicit error)
        setImageSrc('/images/products/default-product-image.jpeg');
        setLoaded(false); // Still considered not successfully loaded the primary image
      }
    };

    const handleError = () => {
      // Always fallback on error
      setImageSrc('/images/products/default-product-image.jpeg');
      setLoaded(false);
    };

    // Attach event listeners
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Clean up event listeners when the component unmounts or src changes
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };

  }, [src]); // Re-run effect when 'src' prop changes

  // You can optionally add a loading spinner or placeholder here
  // before 'loaded' becomes true if you want more visual feedback.
  // For now, it will immediately show the default image if not loaded.

  return (
    <img
      src={imageSrc} // This will be the actual src or the default
      alt={alt}
      className={`${className} ${loaded ? 'image-loaded' : 'image-placeholder'}`} // Optional CSS classes for styling
    />
  );
};

export default SmartImage;