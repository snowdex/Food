import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3">
      <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">Food App</div>
      <div className="flex space-x-4">
        <Link to="/user/login" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300">Login</Link>
        <Link to="/user/signup" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300">Sign Up</Link>
      </div>
    </nav>
  )
}
