import React from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/auth.css'

export default function UserLogin() {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const onSubmit = data => console.log('user login (UI-only) submitted', data)

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>User Login</h2>
        <p className="muted">Welcome back — enter your details to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label>Email</label>
        <input type="email" {...register('email', { required: 'Email is required' })} placeholder="you@example.com" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Password</label>
        <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Your password" />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <div className="auth-help">
          <p>Don't have an account? <a href="/user/signup">Sign up</a></p>
          <p>Or login as a Food Partner: <a href="/food-partner/login">Partner Login</a></p>
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
