// api.js
//const API_URL = "http://localhost:3000/"; // Replace with your base URL

import { useState } from "react";



// Utility function for fetching data

const fetchData = async (url, options = {}) => {
   
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};


// API methods
export const getCategories = () => fetchData("/api/category");

export const getProducts = () => fetchData("/api/products");

export const getProductById = (id) => fetchData(`/api/products/${id}`);

export const getProductsByCategory = (catId) => fetchData(`/api/products/category/${catId}`);

export const getOrders = () => fetchData("/api/orders");

export const addProduct = (productData) => {
  return fetchData("/api/admin/addProduct", {
    method: "POST",
    body: productData,
  });
};

export const deleteProduct = (productId) => {
  return fetchData(`/api/products/${productId}`, {
    method: "DELETE",
  });
};

export const addCategory = (newCategory) => {
  return fetchData("/api/admin/addCategory", {
    method: "POST",
    body: newCategory,
  });
};

export const addToCart =  (options) => {
    return fetchData("/api/cart",{
        method: "POST" ,
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(options),
    });
};



export const updateOrderStatus = (orderId,options) => {
  return fetchData(`/api/orders/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });
};

export const uploadFile = (formData) =>{
  return  fetchData(`/api/upload/image`, {
    method: 'POST',
    body: formData,
  });
};