import React, { Children, useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shop from './Pages/Shop.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import CartPage from './Pages/CartPage.jsx';
import Home from './Pages/Home.jsx';
import NoPage from './Pages/NoPage.jsx';
import Header from './components/Headers/Header.jsx';
import OrdersPage from './Pages/OrdersPage.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import AuthPage from './Pages/AuthPage.jsx';




function App() {
  //<Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}/>
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [userId, setUserId]= useState()
  const ProtectedRoute = ({isAuthenticated,children})=>{
   return isAuthenticated ? children : <Navigate to="/login"/>;
   
  };


/*useEffect(()=>{
  const authStatus = localStorage.getItem('isAuthenticated')
  if(authStatus)
  {
    setIsAuthenticated(true)
  }
},[]);*/


  return (
   
  <BrowserRouter  future={{
    v7_relativeSplatPath: true,
    v7_startTransition: true,
    

  }}>
    <Header userId={userId}/>
      <Routes>
          
          <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated} setUserId={setUserId}/>}/>
          <Route path="/signup" element ={<SignUpPage/>} />
          <Route path="/"  element={<Home/>}/>
              <Route path="/shop" element={<Shop/>} />
          <Route path="/product/:id"  element={<ProductPage/>}/>
              <Route path="/cart" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                                                        <CartPage userId={userId}/>           
                                                           </ProtectedRoute>} />
              <Route path="/user/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                                                         <OrdersPage  userId={userId}/>              
                                                           </ProtectedRoute>}/>
              <Route path ="/user/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                                                         <ProfilePage userId={userId}/>              
                                                           </ProtectedRoute>}/>
              <Route path="*" element={<NoPage/>} />
          
      </Routes>
    </BrowserRouter>
  )
} 

export default App
