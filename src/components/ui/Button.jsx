import React from "react";

export function Button({ children, className, onClick, variant = "default" }) {
  const baseStyles =
    "rounded-md px-4 py-2 font-semibold transition-all duration-300";
  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    outline:
      "border-2 border-black text-black hover:bg-gray-50 hover:border-gray-800",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
