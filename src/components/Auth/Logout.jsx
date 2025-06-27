import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log(localStorage.removeItem("authToken") + "token removed");
        localStorage.removeItem("authToken");

        navigate("auth/login");
      } else {
        console.error("Logout failed");
        navigate("auth/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      navigate("auth/login");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Logging out...</h2>
        <p className="text-gray-600">Please wait while we log you out.</p>
      </div>
    </div>
  );
};

export default Logout;
