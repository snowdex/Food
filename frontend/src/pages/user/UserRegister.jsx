import React from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/auth.css'

export default function UserRegister() {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const onSubmit = data => console.log('user register (UI-only) submitted', data)

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>User Register</h2>
        <p className="muted">Create an account to order food and track deliveries</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label>Full name</label>
        <input {...register('name', { required: 'Name is required' })} placeholder="Jane Doe" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label>Phone (optional)</label>
        <input {...register('phone')} placeholder="+1 (555) 555-5555" />

        <label>Email</label>
        <input type="email" {...register('email', { required: 'Email is required' })} placeholder="you@example.com" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Password</label>
        <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} placeholder="Create a secure password" />
        {errors.password && <p className="error">{errors.password.message}</p>}


        <div className="auth-help">
          <p>Already have an account? <a href="/user/login">Login</a></p>
          <p>Want to register as a Food Partner instead? <a href="/food-partner/signup">Register as Food Partner</a></p>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}
