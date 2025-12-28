import React from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import TextInput from '../components/TextInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FoodPartnerLogin() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/food-partner/login",
        { email, password },
        { withCredentials: true } // IMPORTANT
      );
      if(res.data.message === "Food-Partner Login successful") {
        console.log("Login successful", res.data);
        navigate("/food-partner/home");
      }
      else {
        alert("Login failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
    }
  };




  return (
    <AuthLayout title="Food Partner Login" subtitle="Sign in to manage your offerings">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <TextInput label="Business email" type="email" name="email" placeholder="business@example.com" />
          <TextInput label="Password" type="password" name="password" placeholder="********" />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <input type="checkbox" className="mr-2 rounded" /> Remember me
          </label>

          <a className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline" href="#">Forgot?</a>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign in
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Need an account? <Link to="/food-partner/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">Sign up</Link>
        </p>

        <p className="text-xs text-center text-gray-400">Not a partner? <Link to="/user/login" className="text-indigo-500 hover:underline">User login</Link></p>
      </form>
    </AuthLayout>
  )
}
