import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FoodPartnerLogin from "./pages/FoodPartnerLogin";
import Home from "./pages/Home";
import axios from "axios";
import FoodPartnerRegister from "./pages/FoodPartnerRegister";
import FPHome from "./pages/FPHome";

function App() {

  const [auth, setAuth] = useState({
    loading: null,
    user: null,
  })

    useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/auth/user/me", {
        withCredentials: true,
      })
      .then((res) => {
        setAuth({ loading: false, user: res.data });
      })
      .catch(() => {
        setAuth({ loading: false, user: null });
      });
  }, []);


  if (auth.loading) return null;


  return (
    <Router>
    <Routes>
      <Route
          path="/"
          element={
            auth.user ? <Home /> : <Navigate to="/user/login" />
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
            auth.user ? <Navigate to="/" /> : <UserLogin />
          }
        />
       <Route
          path="/user/signup"
          element={
            auth.user ? <Navigate to="/" /> : <UserRegister />
          }
        />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      <Route path="/food-partner/signup" element={<FoodPartnerRegister />} />
    </Routes>
  </Router>
  );
}

export default App;
