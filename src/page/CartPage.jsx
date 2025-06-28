import React, { useEffect } from "react";
import Cart from "../components/Cart/Cart";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { isAuthenticated, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
