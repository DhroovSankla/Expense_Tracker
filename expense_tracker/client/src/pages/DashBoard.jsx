import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import api from '../api/axiosConfig'
import ExpenseChart from '../components/ExpenseCharts'

const Dashboard = () => {
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('') // Search state

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    
    if (!loggedInUser) {
      navigate('/login')
      return
    }

    const foundUser = JSON.parse(loggedInUser)
    setUser(foundUser)

    const fetchData = async () => {
      try {
        const response = await api.get(`/expenses/user/${foundUser.id}`)
        setExpenses(response.data)
      } catch (error) {
        console.error("Error connecting to backend:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  // --- LOGIC: Real-time Search & Filtered Total ---
  const filteredExpenses = expenses.filter(exp => 
    exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
        try {
            await api.delete(`/expenses/${id}`)
            // Update local state to remove the item instantly
            setExpenses(expenses.filter(exp => exp.id !== id))
        } catch (error) {
            console.error("Delete failed", error)
            alert("Could not delete expense")
        }
    }
  }

  return (
    <div className="container">
      <h1>{user ? `${user.username}'s Dashboard` : 'Dashboard'}</h1>

      {/* 1. Spending Chart Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{marginBottom: '1rem'}}>Spending Breakdown</h2>
        {/* We pass filteredExpenses so the chart updates with your search */}
        <ExpenseChart expenses={filteredExpenses} />
      </div>

      {/* 2. Dynamic Total Card */}
      <div className="card" style={{backgroundColor: 'rgba(0, 196, 159, 0.1)', border: '1px solid var(--accent)', marginBottom: '1.5rem'}}>
        <h3 style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>Total Expenses (Filtered)</h3>
        <h2 style={{fontSize: '2rem'}}>₹{totalAmount.toLocaleString()}</h2>
      </div>

      {/* 3. Search Bar Area */}
      <input 
          type="text" 
          placeholder="Search expenses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
              width: '100%', padding: '0.8rem', marginBottom: '1rem', 
              borderRadius: '8px', border: '1px solid #334155', 
              backgroundColor: '#0f172a', color: 'white'
          }}
      />

      {/* 4. Recent Expenses List Section */}
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
          <h2>Recent Expenses</h2>
          <span style={{color: 'var(--accent)'}}>Count: {filteredExpenses.length}</span>
        </div>

        {loading && <p>Loading...</p>}

        {!loading && filteredExpenses.length === 0 && (
          <p style={{color: 'var(--text-muted)'}}>No matching expenses found.</p>
        )}

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {filteredExpenses.map((expense) => (
            <div key={expense.id} style={{
              padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '8px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <h3 style={{fontSize: '1.1rem', marginBottom: '0.2rem'}}>{expense.description}</h3>
                <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                  {new Date(expense.date).toLocaleDateString('en-IN', { 
                    day: '2-digit', month: 'short', year: 'numeric' 
                  })}
                </span>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
                <div style={{fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--danger)'}}>
                  -₹{expense.amount.toLocaleString()}
                </div>
                <button 
                  onClick={() => handleDelete(expense.id)}
                  style={{background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem'}}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard