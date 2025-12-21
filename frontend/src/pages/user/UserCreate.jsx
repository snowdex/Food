import React from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/auth.css'

export default function UserCreate(){
  const { register, handleSubmit, formState:{errors} } = useForm()
  const onSubmit = data => console.log('create user (UI-only)', data)

  return (
    <div className="auth-card">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label>Full name</label>
        <input placeholder="Jane Doe" {...register('name', { required: 'Name required' })} />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label>Email</label>
        <input placeholder="you@example.com" type="email" {...register('email', { required: 'Email required' })} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <button type="submit" className="btn">Create</button>
      </form>
    </div>
  )
}
