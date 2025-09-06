// src/components/Slider.jsx
import React, { useEffect, useState } from "react";

const Slider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideMessages = [
    "Experience the comfort of our premium upholstery.",
    "Transform your living space with our elegant fabrics.",
    "Craftsmanship and quality in every thread.",
    "Find your perfect match for every mood and room.",
  ];

  // Load images dynamically
  useEffect(() => {
    const imageModules = import.meta.glob(
      "../assets/slider_img/*.{jpg,jpeg,png,svg}",
      {
        eager: true,
        import: "default",
      }
    );
    const loadedImages = Object.values(imageModules);
    setImages(loadedImages);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden shadow-2xl group">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Add text-white class to make the text white */}
          <div className="absolute bottom-5 left-5 text-white bg-black/40 px-4 py-2 rounded-lg text-lg md:text-xl">
            <h2 className="font-semibold text-white !important">
    {slideMessages[index % slideMessages.length]}
  </h2>
          </div>
        </div>
      ))}
      {/* Navigation Buttons */}
      <>
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 text-white text-3xl flex items-center justify-center cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm z-20"
          onClick={handlePrev}
        >
          &#10094;
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 text-white text-3xl flex items-center justify-center cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm z-20"
          onClick={handleNext}
        >
          &#10095;
        </button>
      </>

      {/* Manual Navigation Dots */}
      <div className="absolute bottom-5 w-full flex justify-center space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;