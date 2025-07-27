import React from "react";

const LoadingSpinner = ({ size = "h-12 w-12", message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div
          className={`animate-spin rounded-full ${size} border-b-2 border-purple-600 mx-auto`}
        ></div>
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
