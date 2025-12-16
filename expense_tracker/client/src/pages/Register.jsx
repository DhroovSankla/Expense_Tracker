import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/users/register', formData)
      alert("Registration Successful! Please Login.")
      navigate('/login') // Redirect to Login page
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registration Failed (Email might exist)")
    }
  }

  return (
    <div className="container" style={{maxWidth: '400px', marginTop: '3rem'}}>
      <div className="card">
        <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" placeholder="Username" required
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            type="email" placeholder="Email" required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" className="btn" style={{width: '100%'}}>Register</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)'}}>
          Already have an account? <Link to="/login" style={{color: 'var(--accent)'}}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register