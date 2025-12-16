import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user') // Delete the key
    navigate('/login') // Go to login
  }

  return (
    <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1rem 0', marginBottom: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', textDecoration: 'none' }}>
          ExpenseTracker
        </Link>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {/* Only show these if logged in */}
          {user ? (
            <>
              <span style={{color: 'var(--text-muted)'}}>Hello, {user.username}</span>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
              <Link to="/add" className="btn"> + Add</Link>
              <button onClick={handleLogout} style={{background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1rem'}}>
                Logout
              </button>
            </>
          ) : (
             <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar