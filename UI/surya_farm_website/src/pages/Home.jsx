// src/components/Home.jsx
import React from "react";
import ProductCategories from "../components/ProductCategories";
import Slider from "../components/Slider";
import FeaturesGrid from "../components/FeaturesGrid";
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

const Home = () => {
  return (
    <div className="bg-white font-sans min-h-screen">
      <Slider />
      {/* Features Section */}
      <section className="bg-gray-50 py-12 md:py-16 px-4 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <FeaturesGrid features={features} />
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-8 md:py-12 px-4 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-4">
              About <span className="text-gray-800">Surya Forms & Fabrics</span>
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
      </section>
      
      {/* Product Categories Section */}
      <section className="bg-gray-50 py-12 md:py-16 px-4 md:px-12">
        <div className="container mx-auto max-w-6xl flex justify-center">
          <ProductCategories />
        </div>
      </section>
    </div>
  );
};

export default Home;