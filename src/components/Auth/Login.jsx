import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superKey, setSuperKey] = useState(""); // Added SuperKey input
  const [isAdmin, setIsAdmin] = useState(false); // Added admin toggle state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, ...(isAdmin && { superKey }) }), // Passing superKey only if admin
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
        console.log("User data:", data);

        localStorage.setItem("authToken", data.token);

        navigate("/"); // Redirect to home/dashboard
      } else {
        // More specific error handling
        setError(
          data.message || "Login failed. Please check your credentials."
        );
        if (data.message === "User not found") {
          setError("No account found with this email. Please register first.");
        } else if (data.message === "Invalid password") {
          setError("Incorrect password. Please try again.");
        } else if (data.message === "Invalid superkey for admin login") {
          setError("Invalid admin key. Please check your credentials.");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {message && (
          <p className="text-green-600 bg-green-100 p-2 rounded mb-4 text-sm">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Admin Login
          </label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
            className="form-checkbox text-blue-500"
          />
          {isAdmin && (
            <input
              type="text"
              placeholder="Enter Super Key"
              value={superKey}
              onChange={(e) => setSuperKey(e.target.value)}
              required
              className="border p-2 w-full mt-2 rounded focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Reset it here
          </a>
        </p>

        <p className="mt-2 text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register now
          </a>
        </p>
      </form>
    </div>
  );
}
