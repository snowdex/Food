import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FoodPartnerLogin from "./pages/FoodPartnerLogin";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setPartner, clearAuth } from "./store/authSlice";
import axios from "axios";
import FoodPartnerRegister from "./pages/FoodPartnerRegister";
import FPHome from "./pages/FPHome";
import OrderPage from "./pages/OrderPage";

function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.auth);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userRes = await axios.get(
          import.meta.env.VITE_API_URL
+"/api/v1/auth/user/me",
          { withCredentials: true }
        );
        dispatch(setUser(userRes.data));
        return;
      } catch {
        console.error("Error fetching user data");
      }

      try {
        const fpRes = await axios.get(
          import.meta.env.VITE_API_URL
+"/api/v1/auth/food-partner/me",
          { withCredentials: true }
        );
        dispatch(setPartner(fpRes.data));
        return;
      } catch {
        console.error("Error fetching user or partner data");
      }

      dispatch(clearAuth());
    };

    checkAuth();
  }, [dispatch]);

  if (auth.loading) return null;

  return (
    <Router>
    <Routes>
      <Route
          path="/"
          element={
            auth.role === "user" ? <Home /> : <Navigate to="/user/login" />
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
            <UserLogin />
          }
        />
       <Route
          path="/user/signup"
          element={
            <UserRegister />
          }
        />
      <Route path="/food-partner/login" element={
        <FoodPartnerLogin />} />
      <Route path="/food-partner/signup" element={auth.role === "food-partner" ? <Navigate to="/food-partner/home" /> :<FoodPartnerRegister />} />
      <Route path="/user/checkout" element={<OrderPage />} />
    </Routes>
  </Router>
  );
}

export default App;
