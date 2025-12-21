import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserLogin from './pages/user/UserLogin'
import UserRegister from './pages/user/UserRegister'
import UserList from './pages/user/UserList'
import UserCreate from './pages/user/UserCreate'
import UserEdit from './pages/user/UserEdit'

import PartnerLogin from './pages/partner/PartnerLogin'
import PartnerRegister from './pages/partner/PartnerRegister'
import PartnerList from './pages/partner/PartnerList'
import PartnerCreate from './pages/partner/PartnerCreate'
import PartnerEdit from './pages/partner/PartnerEdit'

import './styles/global.css'
import './styles/auth.css'
import './styles/list.css'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<div>Welcome to the Food App UI (no logic)</div>} />

            {/* User CRUD + Auth UI */}
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/users/:id/edit" element={<UserEdit />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/signup" element={<UserRegister />} />

            {/* Food Partner CRUD + Auth UI */}
            <Route path="/partners" element={<PartnerList />} />
            <Route path="/partners/create" element={<PartnerCreate />} />
            <Route path="/partners/:id/edit" element={<PartnerEdit />} />
            <Route path="/food-partner/login" element={<PartnerLogin />} />
            <Route path="/food-partner/signup" element={<PartnerRegister />} />

            {/* fallback */}
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
