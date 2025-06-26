import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import VerifyOtp from "./components/Auth/VerifyOtp";
import ResetPassword from "./components/Auth/ResetPassword";
import Home from "./page/Home";
import Logout from "./components/Auth/Logout";
import Contact from "./page/Contact";
import About from "./page/About";
import Products from "./page/Products";
import AdminDashboard from "./page/AdminDashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import Feed from "./page/Feed";
import EditFeed from "./components/EditFeed";
import CartPage from "./page/CartPage";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Toaster position="top-right" />
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/feeds" element={<Feed />} />
            <Route path="/feeds/edit/:id" element={<EditFeed />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
