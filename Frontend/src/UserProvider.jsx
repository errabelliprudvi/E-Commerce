import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserCart } from "./api";

// Create UserContext
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(); // Initialize with null to indicate no user
  const [itemsInCart, setItemsInCart] = useState(0); // Start with 0 items
  const [loading, setLoading] = useState(false); // Add loading state for feedback
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 


  const signOut = ()=>{
    setUser(null);
    setIsAdmin(false);
    setItemsInCart(0);
    setIsAuthenticated(false);

  };




  
  const fetchNumberOfItemsInCart = async () => {
    if (!user) 
      {
      return;
      }

    setLoading(true);
    try {
         const result = await getUserCart(user);
        setItemsInCart(result.items.length || 0); // Update count of items
        console.log("Cart data fetched:", result);
        } 
        catch (error) {
        console.error("Error fetching cart data:", error.message);
        } 
        finally {
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
