import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCategories.css";

const categories = [
  {
    name: "Foam & Cushioning Materials",
    image: "/images/products/sodasAndMaterials.png",
    description:
      "Premium quality foam sheets and cushioning solutions ideal for sofas, chairs, and bedding applications.",
  },
  {
    name: "Mattresses & Bedding Essentials",
    image: "/images/products/MattressAndEssentials.png",
    description:
      "High-comfort mattresses, mattress toppers, and essential bedding accessories for restful sleep.",
  },
  {
    name: "Curtains, Rods & Fabric Accessories",
    image: "/images/products/CurtainsAndRods.png",
    description:
      "Elegant curtains, rods, and add-ons to enhance your interiors with style and function.",
  },
  {
    name: "Custom Window Blinds",
    image: "/images/products/CustomWindowBlinds.png",
    description:
      "Stylish and functional window blinds available in various materials and patterns to suit all interiors.",
  },
  {
    name: "Vinyl Flooring & Designer Wallpapers",
    image: "/images/products/VinlyFlooring.png",
    description:
      "Durable vinyl flooring and modern wallpapers to transform walls and floors with ease.",
  },
];

const ProductCategories = () => {
  return (
    <section className="product-category-section">
      <h2>Product Categories</h2>
      <div className="product-card-container">
        {categories.map((category, index) => (
          <div
            className="product-card"
            key={index}
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className="product-card-content">
              <h3>{category.name}</h3>
              <div className="description">{category.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
