import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import this
import api from '../api/axiosConfig'
import ExpenseChart from '../components/ExpenseCharts'


const Dashboard = () => {
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null) // Track the user

  useEffect(() => {
    // 1. GET USER FROM STORAGE
    const loggedInUser = localStorage.getItem('user')
    
    if (!loggedInUser) {
      // If no user found, kick them to Login
      navigate('/login')
      return
    }

    const foundUser = JSON.parse(loggedInUser)
    setUser(foundUser)

    // 2. FETCH DATA FOR *THIS* USER SPECIFICALLY
    const fetchData = async () => {
      try {
        // DYNAMIC URL: Uses foundUser.id instead of "1"
        const response = await api.get(`/expenses/user/${foundUser.id}`)
        setExpenses(response.data)
      } catch (error) {
        console.error("Error connecting to backend:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate]) // Dependency array

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="container">
      {/* Show the User's Name */}
      <h1>{user ? `${user.username}'s Dashboard` : 'Dashboard'}</h1>
<div className="card" style={{ marginBottom: '2rem' }}>
      <h2 style={{marginBottom: '1rem'}}>Spending Breakdown</h2>
      <ExpenseChart expenses={expenses} />
  </div>
<div className="card" style={{backgroundColor: 'rgba(0, 196, 159, 0.1)', border: '1px solid var(--accent)'}}>
   <h3 style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Total Expenses</h3>
   <h2 style={{fontSize: '2rem'}}>₹{totalAmount.toLocaleString()}</h2>
</div>
      {/* ... Rest of your JSX stays exactly the same ... */}
  <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
          <h2>Recent Expenses</h2>
          <span style={{color: 'var(--accent)'}}>Total Items: {expenses.length}</span>
        </div>

        {loading && <p>Loading...</p>}

        {!loading && expenses.length === 0 && (
          <p style={{color: 'var(--text-muted)'}}>No expenses found. Go spend some money!</p>
        )}

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {expenses.map((expense) => (
            <div key={expense.id} style={{
              padding: '1rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{fontSize: '1.1rem', marginBottom: '0.2rem'}}>{expense.description}</h3>
              
             <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
             {new Date(expense.date).toLocaleDateString('en-IN', { 
             day: '2-digit', 
             month: 'short', 
             year: 'numeric' 
             })}
            </span>

              </div>
              <div style={{fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--danger)'}}>
                -${expense.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard