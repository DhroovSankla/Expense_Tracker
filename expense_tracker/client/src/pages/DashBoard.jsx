import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'

const Dashboard = () => {
  // 1. State to hold our data
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  // 2. Fetch data when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // We ask the backend for User #1's data
        const response = await api.get('/expenses/user/1')
        console.log("Data received:", response.data) // Check console to see this!
        setExpenses(response.data)
      } catch (error) {
        console.error("Error connecting to backend:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      <h1>My Dashboard</h1>

      {/* The Expense Card */}
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
          <h2>Recent Expenses</h2>
          <span style={{color: 'var(--accent)'}}>Total Items: {expenses.length}</span>
        </div>

        {/* LOADING STATE */}
        {loading && <p>Loading data from server...</p>}

        {/* EMPTY STATE */}
        {!loading && expenses.length === 0 && (
          <p style={{color: 'var(--text-muted)'}}>No expenses found yet. Go spend some money!</p>
        )}

        {/* DATA LIST */}
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
                <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{expense.date}</span>
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