import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FoodPartnerLogin from "./pages/FoodPartnerLogin";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

import FoodPartnerRegister from "./pages/FoodPartnerRegister";
import FPHome from "./pages/FPHome";
import OrderPage from "./pages/OrderPage";

function App() {


  const { isAuthenticated } = useSelector((state) => state.auth);
  


  return (
    <Router>
    <Routes>
      <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/user/login" />
          }
        />
      <Route
        path="/food-partner/home"
        element={
          <FPHome />
        }
      />
       <Route
          path="/user/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <UserLogin />
          }
        />
       <Route
          path="/user/signup"
          element={
            isAuthenticated ? <Navigate to="/" /> : <UserRegister />
          }
        />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      <Route path="/food-partner/signup" element={<FoodPartnerRegister />} />
      <Route path="/user/checkout" element={<OrderPage />} />
    </Routes>
  </Router>
  );
}

export default App;
