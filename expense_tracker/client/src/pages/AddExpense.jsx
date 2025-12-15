import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'

const AddExpense = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0] // Today's date
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/expenses', {
        userId: 1,      // Hardcoded for now
        categoryId: 1,  // Hardcoded 'Food' for now
        description: formData.description,
        amount: parseFloat(formData.amount),
        date: formData.date
      })
      alert('Expense Added!')
      navigate('/') // Go back to dashboard
    } catch (error) {
      console.error("Error adding expense:", error)
      alert("Failed to add expense")
    }
  }

  return (
    <div className="container">
      <h1>Add New Expense</h1>
      <div className="card" style={{maxWidth: '500px'}}>
        <form onSubmit={handleSubmit}>
          
          <label>Description</label>
          <input 
            type="text" 
            placeholder="e.g. Uber, Pizza"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required 
          />

          <label>Amount (₹)</label>
          <input 
            type="number" 
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required 
          />

          <label>Date</label>
          <input 
            type="date" 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required 
          />

          <button type="submit" className="btn" style={{width: '100%', marginTop: '1rem'}}>
            Save Expense
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddExpense