import React from 'react'

export default function TextInput({ label, type = 'text', name, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  )
}
