import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [superkey, setSuperkey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: isAdmin ? "admin" : "user",
          superKey: superkey, // Changed from superkey
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Registration successful");
        setError("");
        navigate("auth/login");
      } else {
        setError(result.message || "An error occurred");
        setMessage("");
      }
    } catch (err) {
      setError("Failed to connect to server.");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>
        {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address."
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              id="admin-checkbox"
              className="form-checkbox text-indigo-600"
            />
            <label
              htmlFor="admin-checkbox"
              className="ml-2 text-sm text-gray-700"
            >
              Admin
            </label>
          </div>
          {isAdmin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Superkey
              </label>
              <input
                type="text"
                value={superkey}
                onChange={(e) => setSuperkey(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="auth/login" className="text-indigo-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
