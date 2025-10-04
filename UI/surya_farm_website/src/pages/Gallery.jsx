import React from "react";

// Import all images inside assets/shop_images
const images = import.meta.glob("/public/images/shop_images/*.{png,jpg,jpeg,svg}", { eager: true });

const Gallery = () => {
  const imagePaths = Object.values(images).map((img) => img.default || img);

  return (
    <div className="gallery-page px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imagePaths.map((src, index) => (
          <div
            key={index}
            className="gallery-item overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img src={src} alt={`shop-${index}`} className="w-full h-64 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
