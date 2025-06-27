// // Frontend: src/hooks/useUser.js
// import { useState, useEffect, useCallback } from "react";

// export const useUser = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkAuthStatus = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         setIsAuthenticated(false);
//         setIsAdmin(false);
//         return;
//       }

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}auth/verify`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setIsAuthenticated(true);
//         setIsAdmin(data.isAdmin);
//       } else {
//         localStorage.removeItem("authToken");
//         setIsAuthenticated(false);
//         setIsAdmin(false);
//       }
//     } catch (error) {
//       console.error("Auth check error:", error);
//       setIsAuthenticated(false);
//       setIsAdmin(false);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     checkAuthStatus();
//   }, [checkAuthStatus]);

//   const login = useCallback(
//     async (token) => {
//       if (token) {
//         localStorage.setItem("authToken", token);
//         await checkAuthStatus(); // Re-verify with backend instead of parsing locally
//       }
//     },
//     [checkAuthStatus]
//   );

//   const logout = useCallback(() => {
//     localStorage.removeItem("authToken");
//     setIsAuthenticated(false);
//     setIsAdmin(false);
//   }, []);

//   // console.log("isAuthenticated:", isAuthenticated);
//   // console.log("isAdmin:", isAdmin);
//   return {
//     isAuthenticated,
//     isAdmin,
//     loading,
//     login,
//     logout,
//     checkAuthStatus,
//   };
// };

// export default useUser;
