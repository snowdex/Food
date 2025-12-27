import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import TextInput from '../components/TextInput'
import axios from 'axios'

export default function UserRegister() {

  
  const navigate = useNavigate();




  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/user/signup', {name, email, password}, { withCredentials: true });
      if(res.data.message === "User registered successfully") {
        console.log("Registration successful", res.data);
        
        navigate("/");  
      }else{
        alert("Registration failed: " + res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }





  return (
    <AuthLayout title="Create account" subtitle="Register as an app user">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <TextInput label="Full name" name="name" placeholder="Your name" />
          <TextInput label="Email" type="email" name="email" placeholder="you@example.com" />
          <TextInput label="Password" type="password" name="password" placeholder="Create a password" />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create account
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account? <Link to="/user/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
