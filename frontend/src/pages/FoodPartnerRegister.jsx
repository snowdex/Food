import React from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import TextInput from '../components/TextInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPartner } from '../store/authSlice'

export default function FoodPartnerRegister() {

  const navigate = useNavigate();
  const dispatch = useDispatch()



  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/food-partner/signup', {name, email, password}, { withCredentials: true });
      if(res.data.message === "Food Partner registered successfully") {
        console.log("Registration successful", res.data);
        dispatch(setPartner(res.data.foodPartner));
        navigate("/food-partner/home");  
      }else{
        alert("Registration failed: " + res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }







  return (
    <AuthLayout title="Partner sign up" subtitle="Create a food partner account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <TextInput label="Business name" name="name" placeholder="Your business" />
          <TextInput label="Business email" type="email" name="email" placeholder="business@example.com" />
          <TextInput label="Password" type="password" name="password" placeholder="Create a password" />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create account
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already registered? <Link to="/food-partner/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
