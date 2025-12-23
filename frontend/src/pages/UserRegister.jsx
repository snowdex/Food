import React from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import TextInput from '../components/TextInput'

export default function UserRegister() {
  return (
    <AuthLayout title="Create account" subtitle="Register as an app user">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
