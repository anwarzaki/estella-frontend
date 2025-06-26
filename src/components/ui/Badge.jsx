import React from "react";

export function Badge({ children, className }) {
  return (
    <span
      className={`inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
