import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center text-red-600 p-4">
      <div className="flex items-center justify-center mb-2">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span className="font-medium">Error</span>
      </div>
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
