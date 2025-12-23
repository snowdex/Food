import React from 'react'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md ring-1 ring-gray-200 dark:ring-gray-700">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{subtitle}</p>
          )}
        </div>

        <div className="mt-4">{children}</div>

        {footer && <div className="text-sm text-center text-gray-500 dark:text-gray-400">{footer}</div>}
      </div>
    </div>
  )
}
