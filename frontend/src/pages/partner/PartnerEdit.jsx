import React from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/auth.css'
import { useParams } from 'react-router-dom'

export default function PartnerEdit(){
  const { id } = useParams()
  const { register, handleSubmit, formState:{errors} } = useForm({ defaultValues: { businessName: `Partner ${id}`, contactName: `Contact ${id}`, email: `partner${id}@example.com` } })
  const onSubmit = data => console.log('edit partner (UI-only)', data)

  return (
    <div className="auth-card">
      <h2>Edit Partner #{id}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label>Business Name</label>
        <input placeholder="e.g., Good Eats" {...register('businessName', { required: 'Business Name required' })} />
        {errors.businessName && <p className="error">{errors.businessName.message}</p>}

        <label>Contact Person</label>
        <input placeholder="Full name" {...register('contactName', { required: 'Contact Name required' })} />
        {errors.contactName && <p className="error">{errors.contactName.message}</p>}

        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  )
}
