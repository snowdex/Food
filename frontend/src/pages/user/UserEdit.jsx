import React from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/auth.css'
import { useParams } from 'react-router-dom'

export default function UserEdit(){
  const { id } = useParams()
  const { register, handleSubmit, formState:{errors} } = useForm({ defaultValues: { name: `User ${id}`, email: `user${id}@example.com` } })
  const onSubmit = data => console.log('edit user (UI-only)', data)

  return (
    <div className="auth-card">
      <h2>Edit User #{id}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label>Full name</label>
        <input placeholder="Jane Doe" {...register('name', { required: 'Name required' })} />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label>Email</label>
        <input placeholder="you@example.com" type="email" {...register('email', { required: 'Email required' })} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  )
}
