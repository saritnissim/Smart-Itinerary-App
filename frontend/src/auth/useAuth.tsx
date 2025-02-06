import { createContext, useContext, useState, useEffect } from "react";
import * as smartItineraryApi from "../api/smartItineraryApi";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Store userId in context

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await smartItineraryApi.login(email, password);
      if (response && response.data.token) {
        const token = response.data.token;
        const userId = response.data.user.id;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        setUserId(userId); // Save userId in state
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return {
          success: false,
          message: "Login failed, invalid credentials.",
        };
      }
    } catch (error) {
      console.log("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null); // Clear userId on logout
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
