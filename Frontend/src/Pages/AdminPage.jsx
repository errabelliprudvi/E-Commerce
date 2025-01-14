import React, { useState } from "react";

import OrdersPage from "../components/Admin/viewOrders.jsx"; // Import your orders page
import ProductsPage from "../components/Admin/addProduct.jsx"; // Import your products page
import DeleteProductPage from "../components/Admin/deleteProduct.jsx"; // Import your users page
import CategoriesPage from "../components/Admin/addCategory.jsx";
import AdminDataDashboard from "../components/Admin/adminDataDashboard.jsx";





const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Orders");

  // Function to render the selected page
  const renderPage = () => {
    switch (selectedPage) {
      case "Orders":
        return <OrdersPage />;
      case "Products":
        return <ProductsPage />;
      case "Categories":
        return <CategoriesPage />;
      case "Delete Products":
        return <DeleteProductPage />;
      case "Data":
        return <AdminDataDashboard />;
      default:
        return <div>Select a page from the menu</div>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#2C3E50",
          color: "#ECF0F1",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Admin Dashboard</h2>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        <li
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: selectedPage === "Data" ? "#34495E" : "transparent",
              borderRadius: "5px",
              margin: "10px 0",
            }}
            onClick={() => setSelectedPage("Data")}
          >
            Data Dashboard
          </li>
          <li
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: selectedPage === "Orders" ? "#34495E" : "transparent",
              borderRadius: "5px",
              margin: "10px 0",
            }}
            onClick={() => setSelectedPage("Orders")}
          >
            Orders
          </li>
          <li
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: selectedPage === "Products" ? "#34495E" : "transparent",
              borderRadius: "5px",
              margin: "10px 0",
            }}
            onClick={() => setSelectedPage("Products")}
          >
            Products
          </li>
          <li
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: selectedPage === "Categories" ? "#34495E" : "transparent",
              borderRadius: "5px",
              margin: "10px 0",
            }}
            onClick={() => setSelectedPage("Categories")}
          >
            Categories
          </li>
          <li
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: selectedPage === "Delete Products" ? "#34495E" : "transparent",
              borderRadius: "5px",
              margin: "10px 0",
            }}
            onClick={() => setSelectedPage("Delete Products" )}
          >
            Delete Products
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#ECF0F1",
        }}
      >
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;
