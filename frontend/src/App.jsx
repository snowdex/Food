import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FoodPartnerLogin from "./pages/FoodPartnerLogin";
import Home from "./pages/Home";
import FoodPartnerRegister from "./pages/FoodPartnerRegister";

function App() {
  return (
    <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Home />
        }
      />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserRegister />} />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      <Route path="/food-partner/signup" element={<FoodPartnerRegister />} />
    </Routes>
  </Router>
  );
}

export default App;
