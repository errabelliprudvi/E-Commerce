import React, { createContext, useState, useContext, useEffect } from "react";

// Create UserContext
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null to indicate no user
  const [itemsInCart, setItemsInCart] = useState(0); // Start with 0 items
  const [loading, setLoading] = useState(false); // Add loading state for feedback

  const fetchNumberOfItemsInCart = async () => {
    if (!user) {
      console.log("User not logged in. Cannot fetch cart.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/cart/${user}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.log("Your Cart is Empty...");
          setItemsInCart(0); // Set count to 0 if the cart is empty
          return;
        }
        throw new Error("Failed to fetch cart data.");
      }

      const result = await response.json();
      setItemsInCart(result.items.length || 0); // Update count of items
      console.log("Cart data fetched:", result);
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>
  {
    fetchNumberOfItemsInCart()
  }

  ,[user]
  )

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        itemsInCart,
        setItemsInCart,
        fetchNumberOfItemsInCart,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for easier access
export const useUser = () => useContext(UserContext);
