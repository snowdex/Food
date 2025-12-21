import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/list.css'

export default function PartnerList(){
  const mock = [
    { id: 1, business: 'Good Eats', contact: 'Sam' },
    { id: 2, business: 'Tasty Bites', contact: 'Lina' }
  ]

  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Food Partners</h2>
        <Link to="/partners/create" className="btn">Create Partner</Link>
      </div>
      <table className="list-table">
        <thead>
          <tr><th>Business</th><th>Contact</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {mock.map(p => (
            <tr key={p.id}>
              <td>{p.business}</td>
              <td>{p.contact}</td>
              <td>
                <Link to={`/partners/${p.id}/edit`} className="btn-sm">Edit</Link>
                <button className="btn-sm danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
