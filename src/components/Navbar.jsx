import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";  
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, loading } = useUser();
  const { cart } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define base links available to all authenticated users
  const baseLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/products", label: "Products" },
    { path: "/feeds", label: "Feeds" },
  ];

  // Admin-only links
  const adminLinks = [{ path: "/admin", label: "Admin Panel" }];

  // Combine links based on user role
  const navigationLinks = isAdmin ? [...baseLinks, ...adminLinks] : baseLinks;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-16 bg-[#003366]/90 text-white">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-transparent hover:bg-white/80 transition-all duration-300 z-50">
      <header className="bg-[#003366]/90 hover:bg-[#003366] transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h2 className="text-2xl font-serif text-white tracking-tight drop-shadow-xl">
              EstellaParis
            </h2>
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            {/* Desktop Navigation */}
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {/* Search Bar */}
                <li className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-white p-2 rounded-l-md text-black h-10 w-48"
                  />
                  <button className="px-2 bg-[#873B4D] text-white rounded-r-md h-10 w-10 text-xl flex items-center justify-center hover:bg-[#B76E79] transition-colors">
                    <FaSearch />
                  </button>
                </li>
                {/* Navigation Links */}
                {navigationLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Auth Buttons and Cart */}
            <div className="flex items-center gap-4">
              {/* Cart Icon */}
              <Link to="/cart" className="relative text-white hover:text-gray-200">
                <FaShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#873B4D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/logout"
                  className="hidden md:block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#9F4C5B] transition hover:text-[#B76E79]"
                >
                  Logout
                </Link>
              ) : (
                <div className="hidden md:flex gap-4">
                  <Link
                    to="/login"
                    className="rounded-md bg-[#9F4C5B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#B76E79]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#9F4C5B] transition hover:text-[#B76E79]"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                onClick={toggleMenu}
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#003366] md:hidden">
            <div className="p-4">
              {/* Mobile Search */}
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 p-2 rounded-l-md"
                />
                <button className="px-4 bg-[#873B4D] text-white rounded-r-md">
                  <FaSearch />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <ul className="flex flex-col gap-4">
                {navigationLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white hover:text-gray-200 block py-2"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                {/* Cart Link in Mobile Menu */}
                <li>
                  <Link
                    to="/cart"
                    className="text-white hover:text-gray-200 block py-2 flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <FaShoppingCart />
                    Cart {cart.length > 0 && `(${cart.length})`}
                  </Link>
                </li>

                {/* Mobile Auth Links */}
                {isAuthenticated ? (
                  <li>
                    <Link
                      to="/logout"
                      className="text-white hover:text-gray-200 block py-2"
                      onClick={toggleMenu}
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="text-white hover:text-gray-200 block py-2"
                        onClick={toggleMenu}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="text-white hover:text-gray-200 block py-2"
                        onClick={toggleMenu}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;

// hanji;
