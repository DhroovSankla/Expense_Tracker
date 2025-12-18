import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6666'];

const ExpenseChart = ({ expenses }) => {
  
  // --- THE MATH ENGINE ---
  // We take the raw list of expenses and group them by category name
  const data = expenses.reduce((acc, expense) => {
    // 1. Get category name (Defensive check in case backend data is incomplete)
    const categoryName = expense.category ? expense.category.name : 'Other'
    
    // 2. Check if we already have this category in our list
    const existing = acc.find(item => item.name === categoryName)
    
    if (existing) {
      // 3. If yes, add the amount
      existing.value += expense.amount
    } else {
      // 4. If no, create new entry
      acc.push({ name: categoryName, value: expense.amount })
    }
    return acc
  }, [])
  // -----------------------

  if (expenses.length === 0) {
    return <div style={{textAlign: 'center', color: 'gray'}}>No data to chart</div>
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Makes it a Donut Chart (looks modern)
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `$${value}`} 
            contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px'}}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ExpenseChart