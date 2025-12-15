import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ 
      borderBottom: '1px solid rgba(255,255,255,0.1)', 
      padding: '1rem 0', 
      marginBottom: '2rem' 
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        {/* Logo */}
        <Link to="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: 'var(--accent)', 
          textDecoration: 'none' 
        }}>
          ExpenseTracker
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/add" className="btn"> + Add Expense</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar