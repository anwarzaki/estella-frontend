// // Frontend: src/hooks/useUser.js
// import { useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";

// export const useUser = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         setIsAuthenticated(false);
//         setIsAdmin(false);
//         setLoading(false);
//         return;
//       }

//       const response = await fetch("http://localhost:5000/api/auth/verify", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const decoded = jwt_decode(token);
//         setIsAuthenticated(true);
//         setIsAdmin(decoded.role === "admin");
//       } else {
//         localStorage.removeItem("authToken");
//         setIsAuthenticated(false);
//         setIsAdmin(false);
//       }
//     } catch (error) {
//       setIsAuthenticated(false);
//       setIsAdmin(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { isAuthenticated, isAdmin, loading, checkAuthStatus };
// };

// export default useUser;

// Frontend: src/hooks/useUser.js
import { useState, useEffect, useCallback } from "react";

export const useUser = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // const parseJwt = useCallback((token) => {
  //   try {
  //     const base64Url = token.split(".")[1];
  //     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split("")
  //         .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
  //         .join("")
  //     );
  //     return JSON.parse(jsonPayload);
  //   } catch (error) {
  //     console.error("JWT parsing error:", error);
  //     return null;
  //   }
  // }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setIsAdmin(data.isAdmin);
      } else {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(
    async (token) => {
      if (token) {
        localStorage.setItem("authToken", token);
        await checkAuthStatus(); // Re-verify with backend instead of parsing locally
      }
    },
    [checkAuthStatus]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setIsAdmin(false);
  }, []);

  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("isAdmin:", isAdmin);
  return {
    isAuthenticated,
    isAdmin,
    loading,
    login,
    logout,
    checkAuthStatus,
  };
};

export default useUser;
