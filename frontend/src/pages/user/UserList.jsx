import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/list.css'

export default function UserList(){
  const mockUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ]

  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Users</h2>
        <Link to="/users/create" className="btn">Create User</Link>
      </div>
      <table className="list-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {mockUsers.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <Link to={`/users/${u.id}/edit`} className="btn-sm">Edit</Link>
                <button className="btn-sm danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
