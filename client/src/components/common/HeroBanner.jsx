import React from "react";

const HeroBanner = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  secondaryButtonIcon,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl p-8 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      {/* Purple/Pink swirling shape on the right */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full opacity-40 blur-3xl transform translate-x-20 -translate-y-20 animate-pulse"></div>
      {/* Additional decorative elements */}
      <div className="absolute right-20 top-10 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl transform -translate-x-10 translate-y-10"></div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex space-x-4">
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg transform hover:scale-105">
            {primaryButton}
          </button>
          <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200 font-medium flex items-center transform hover:scale-105">
            {secondaryButtonIcon}
            {secondaryButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
