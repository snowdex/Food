import React from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/auth.css'

export default function PartnerLogin() {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const onSubmit = data => console.log('partner login (UI-only) submitted', data)

  return (
    <div className="auth-card">
      <h2>Food Partner Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label>Partner Email</label>
        <input placeholder="contact@business.com" type="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Password</label>
        <input placeholder="Your password" type="password" {...register('password', { required: 'Password is required' })} />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <div className="auth-help">
          <p>Don't have an account? <a href="/food-partner/signup">Register as Food Partner</a></p>
          <p>Or login as a User: <a href="/user/login">User Login</a></p>
        </div>

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  )
}
