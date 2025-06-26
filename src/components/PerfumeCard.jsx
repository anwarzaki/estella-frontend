import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const PerfumeCard = ({ perfumes, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(null);
  const { isAdmin } = useUser();
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return typeof price === "number" ? `₹${price.toLocaleString()}` : price;
  };

  const toggleMenu = (id) => {
    setMenuOpen((prevId) => (prevId === id ? null : id));
  };

  const handleAddToCart = (perfume) => {
    addToCart({
      id: perfume.id || perfume._id,
      name: perfume.name,
      price: perfume.price,
      image: perfume.imgSrc,
      brand: perfume.brand
    });
    toast.success(`${perfume.name} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 bg-gray-50">
      {perfumes.map((perfume) => (
        <div
          key={perfume.id || perfume._id}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          {/* Perfume Image */}
          <div className="relative h-72 w-full overflow-hidden rounded-t-2xl">
            <img
              src={perfume.imgSrc}
              alt={perfume.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {perfume.stock < 5 && (
              <span className="absolute top-4 left-4 rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white shadow-md">
                Low Stock: {perfume.stock}
              </span>
            )}
          </div>

          {/* Menu Button */}
          {isAdmin ? (
            <div className="absolute top-4 right-4">
              <button
                onClick={() => toggleMenu(perfume.id || perfume._id)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
              {menuOpen === (perfume.id || perfume._id) && (
                <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white shadow-md z-10">
                  <button
                    onClick={() => {
                      onEdit(perfume);
                      setMenuOpen(null);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(perfume)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {/* Perfume Details */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {perfume.name}
              </h3>
              {perfume.ratings > 0 && (
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">
                    {perfume.ratings.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <div className="text-gray-600 text-sm space-y-1">
              <p>
                Price:{" "}
                <span className="font-semibold">
                  {formatPrice(perfume.price)}
                </span>
              </p>
              <p>
                Brand: <span className="font-semibold">{perfume.brand}</span>
              </p>
              <p>
                Category:{" "}
                <span className="font-semibold">{perfume.category}</span>
              </p>
            </div>

            {perfume.description && (
              <p className="text-gray-500 text-sm line-clamp-2">
                {perfume.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-gray-200 p-6">
            <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
              Purchase
            </button>
            <button 
              onClick={() => handleAddToCart(perfume)}
              className="flex items-center gap-2 rounded-lg border-2 border-black px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h18M9 13h6M5 17h14"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerfumeCard;
