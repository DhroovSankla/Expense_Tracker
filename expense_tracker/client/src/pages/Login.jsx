import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/users/login', formData)
      
      // CRITICAL: Save the user info in the browser's storage
      localStorage.setItem('user', JSON.stringify(response.data))
      
      alert("Login Successful!")
      navigate('/') // Go to Dashboard
    } catch (error) {
      console.error("Login failed:", error)
      alert("Invalid Email or Password")
    }
  }

  return (
    <div className="container" style={{maxWidth: '400px', marginTop: '3rem'}}>
      <div className="card">
        <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" placeholder="Email" required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" className="btn" style={{width: '100%'}}>Login</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)'}}>
          New here? <Link to="/register" style={{color: 'var(--accent)'}}>Create Account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login