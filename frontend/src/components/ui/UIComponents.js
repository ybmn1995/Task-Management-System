import React from "react";

// Button Component
export const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};

// Card Component
export const Card = ({ children, className }) => {
  return (
    <div className={`p-4 bg-white shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
};

// Input Component
export const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded-lg ${className}`}
    />
  );
};
