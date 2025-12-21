import React from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/auth.css'

export default function PartnerCreate(){
  const { register, handleSubmit, formState:{errors} } = useForm()
  const onSubmit = data => console.log('create partner (UI-only)', data)

  return (
    <div className="auth-card">
      <h2>Create Partner</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label>Business Name</label>
        <input placeholder="e.g., Good Eats" {...register('businessName', { required: 'Business Name required' })} />
        {errors.businessName && <p className="error">{errors.businessName.message}</p>}

        <label>Contact Person</label>
        <input placeholder="Full name" {...register('contactName', { required: 'Contact Name required' })} />
        {errors.contactName && <p className="error">{errors.contactName.message}</p>}

        <label>Email</label>
        <input placeholder="contact@business.com" type="email" {...register('email', { required: 'Email required' })} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <button type="submit" className="btn">Create</button>
      </form>
    </div>
  )
}
