import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shop from './Pages/ShopPage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import CartPage from './Pages/CartPage.jsx';
import Home from './Pages/HomePage.jsx';
import NoPage from './Pages/NoPage.jsx';
import Header from './components/Headers/Header.jsx';
import OrdersPage from './Pages/OrdersPage.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import AuthPage from './Pages/AuthPage.jsx';
import AdminPage from './Pages/AdminPage.jsx';

import { useUser } from './UserProvider.jsx';

function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState();
  const{user,isAdmin,isAuthenticated,setIsAuthenticated} = useUser();

  const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  const ProtectedRouteA = ({ isAuthenticated, isAdmin, children }) => {
    return isAuthenticated ? isAdmin ? children : alert("UnAuthorized Access"):<Navigate to="/login" />;
  };

  // Persist authentication state (optional)
  /*useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus) {
      setIsAuthenticated(true);
    }
  }, []);
*/
  return (
    <BrowserRouter>
      <Header userId={user} />
      <Routes>
        <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated}  />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        
        <Route path="/cart" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CartPage userId={user} /></ProtectedRoute>} />
        <Route path="/user/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated}><OrdersPage userId={user} /></ProtectedRoute>} />
        <Route path="/user/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProfilePage userId={user} /></ProtectedRoute>} />
        
        <Route path="/dashboard" element={<ProtectedRouteA isAuthenticated={isAuthenticated} isAdmin={isAdmin}><AdminPage /></ProtectedRouteA>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
