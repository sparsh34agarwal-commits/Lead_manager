import React from 'react'
import Login_page from './pages/Login_page'
import Register_page from './pages/Register_page'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/register' element={<Register_page/>}/>
        <Route path='/login' element={<Login_page/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App