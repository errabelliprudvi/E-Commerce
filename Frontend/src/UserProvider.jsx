import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserCart } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

// Create UserContext
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signOut = () => {
    setUser(null);
    setIsAdmin(false);
    setItemsInCart(0);
    setIsAuthenticated(false);
  };

  const fetchNumberOfItemsInCart = async (id) => {
    try {
      const result = await getUserCart(id);
      setItemsInCart(result.items?.length || 0);
      console.log("Cart data fetched:", result);
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    }
  };

  const fetchUserSession = async () => {
    try {
      const res = await fetch(`${API_URL}/user/session`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.id);
        setIsAdmin(data.isAdmin);
        setIsAuthenticated(true);
        if (data.id) {
          await fetchNumberOfItemsInCart(data.id);
        }
      } else {
        signOut();
      }
    } catch (error) {
      console.error("Error fetching user session:", error.message);
      signOut();
    }
  };

  useEffect(() => {
    fetchUserSession();
  }, []); // Correct dependency array

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        itemsInCart,
        setItemsInCart,
        fetchNumberOfItemsInCart,
        isAdmin,
        setIsAdmin,
        signOut,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for easier access
export const useUser = () => useContext(UserContext);
