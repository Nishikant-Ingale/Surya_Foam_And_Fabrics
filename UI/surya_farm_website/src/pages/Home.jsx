import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Button from "../components/Button";
import ProductCategories from "../components/ProductCategories";

import {
  Droplet,
  Baby,
  Glasses,
  PawPrint,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Flame,
} from "lucide-react";

const Home = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const features = [
    { icon: <Droplet size={32} />, label: "Water Repellent" },
    { icon: <Baby size={32} />, label: "Child Friendly" },
    { icon: <Glasses size={32} />, label: "Party Friendly" },
    { icon: <PawPrint size={32} />, label: "Pet Friendly" },
    { icon: <ShieldCheck size={32} />, label: "Durable" },
    { icon: <SprayCan size={32} />, label: "Easy Clean" },
    { icon: <Sparkles size={32} />, label: "Stain Friendly" },
    { icon: <Flame size={32} />, label: "Fire Retardant" },
  ];

  // Load images dynamically from assets/slider_imgs
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
    }, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval);
  }, [images]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="home-page">
      <div className="slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          >
            {index === currentIndex && (
              <div className="slide-text">
                <h2>Slide {index + 1}</h2>
              </div>
            )}
          </div>
        ))}

        {/* Navigation Buttons */}
        {images.length > 0 && (
          <>
            <button className="slider-button prev" onClick={handlePrev}>
              &#10094;
            </button>
            <button className="slider-button next" onClick={handleNext}>
              &#10095;
            </button>
          </>
        )}
      </div>
      {/* Features Grid Section */}
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-item" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.label}</h3>
          </div>
        ))}
      </div>

      <div className="about-section">
        <div className="about-title">
          <h3>
            About <span>Surya Forms & Fabrics</span>
          </h3>
        </div>
        <div className="about-text">
          <p>
            At Surya Foam & Fabrics, we blend comfort with craftsmanship.
            Specializing in premium-quality mattresses, cushions, and upholstery
            fabrics, we are dedicated to enriching homes with comfort and
            elegance. Our products reflect a perfect fusion of innovation and
            tradition, ensuring durability, design, and exceptional comfort.
            Proudly rooted in Indian values, we strive to redefine the way India
            relaxes, one home at a time.
          </p>
        </div>
      </div>
      <ProductCategories />
    </div>
  );
};

export default Home;
