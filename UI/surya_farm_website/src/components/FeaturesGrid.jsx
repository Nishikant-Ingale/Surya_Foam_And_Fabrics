// src/components/FeaturesGrid.jsx
import React from "react";

const FeaturesGrid = ({ features }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-8 justify-items-center">
      {features.map((feature, index) => (
        <div
          className="flex flex-col items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg rounded-xl"
          key={index}
        >
          <div className="text-gray-800 transition-colors duration-300 hover:text-orange-500">
            {feature.icon}
          </div>
          <h3 className="mt-2 text-center text-xs sm:text-sm font-semibold text-gray-700">
            {feature.label}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;