import React from 'react';

const Spinner = ({ size = "h-4 w-4" }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Spinner */}
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent border-blue-500 ${size}`}
        role="status"
        aria-label="Loading"
      ></div>
      
      {/* Loading Text */}
      {/* <p className="mt-2 text-blue-500 text-sm font-medium">Loading...</p> */}
    </div>
  );
};

export default Spinner;
