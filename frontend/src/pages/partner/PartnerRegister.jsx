import React from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/auth.css'

export default function PartnerRegister() {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const onSubmit = data => console.log('partner register (UI-only) submitted', data)

  return (
    <div className="auth-card">
      <h2>Food Partner Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label>Business Name</label>
        <input placeholder="e.g., Good Eats" {...register('businessName', { required: 'Business name is required' })} />
        {errors.businessName && <p className="error">{errors.businessName.message}</p>}

        <label>Contact Person</label>
        <input placeholder="Full name" {...register('contactName', { required: 'Contact name is required' })} />
        {errors.contactName && <p className="error">{errors.contactName.message}</p>}

        <label>Email</label>
        <input placeholder="contact@business.com" type="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Password</label>
        <input placeholder="At least 6 characters" type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <div className="auth-help">
          <p>Already have an account? <a href="/food-partner/login">Login as Food Partner</a></p>
          <p>Want to register as a user instead? <a href="/user/signup">Register as User</a></p>
        </div>

        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  )
}
