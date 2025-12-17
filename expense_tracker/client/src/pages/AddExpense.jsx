import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'

const AddExpense = () => {
  const navigate = useNavigate()
  
  // State for the form
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    categoryId: '' // Empty initially
  })

  // State for the dropdown list
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
        navigate('/login')
        return
    }

    // FETCH CATEGORIES FROM BACKEND
    const fetchCategories = async () => {
        try {
            const response = await api.get(`/categories/user/${user.id}`)
            setCategories(response.data)
            
            // Auto-select the first category if available
            if (response.data.length > 0) {
                setFormData(prev => ({...prev, categoryId: response.data[0].id}))
            }
        } catch (error) {
            console.error("Failed to load categories", error)
        }
    }

    fetchCategories()
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))

    try {
      await api.post('/expenses', {
        userId: user.id,
        categoryId: formData.categoryId, // Uses the selected ID
        description: formData.description,
        amount: parseFloat(formData.amount),
        date: formData.date
      })
      alert('Expense Added!')
      navigate('/')
    } catch (error) {
      console.error("Error adding expense:", error)
      alert("Failed to add expense")
    }
  }
const handleAddCategory = async () => {
    const newCategoryName = prompt("Enter new category name:")
    if (!newCategoryName) return

    const user = JSON.parse(localStorage.getItem('user'))
    
    try {
        const response = await api.post('/categories', {
            name: newCategoryName,
            userId: user.id
        })
        
        // Add the new category to the list immediately
        setCategories([...categories, response.data])
        // Select it automatically
        setFormData({...formData, categoryId: response.data.id})
    } catch (error) {
        console.error("Failed to create category", error)
        alert("Failed to create category")
    }
  }

  return (
    <div className="container">
      <h1>Add New Expense</h1>
      <div className="card" style={{maxWidth: '500px'}}>
        <form onSubmit={handleSubmit}>
          
          {/* CATEGORY DROPDOWN */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <label>Category</label>
            <button 
                type="button" 
                onClick={handleAddCategory}
                style={{background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.9rem'}}
            >
                + New Category
            </button>
          </div>
          <select 
            className="input-field" // We will style this in a second
            value={formData.categoryId}
            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
            style={{
                width: '100%', 
                padding: '0.8rem', 
                marginBottom: '1rem', 
                borderRadius: '8px',
                backgroundColor: '#0f172a',
                color: 'white',
                border: '1px solid #334155'
            }}
          >
            {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
            ))}
          </select>

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