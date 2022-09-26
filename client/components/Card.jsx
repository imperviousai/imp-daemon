import React from "react";

const Card = ({ children }) => {
  return (
    <div className="rounded-md bg-white px-4 py-5 border-b border-gray-200 sm:px-6 h-full">
      {children}
    </div>
  );
};

export default Card;
