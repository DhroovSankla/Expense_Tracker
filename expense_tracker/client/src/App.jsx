import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/DashBoard'
import AddExpense from './pages/AddExpense'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      {/* 1. The Navigation Bar stays at the top */}
      <Navbar />

      {/* 2. The Content changes based on the URL */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* We will add the "Add Expense" page later */}
       <Route path="/add" element={<AddExpense />} />

       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
      
       </Routes>
    </>
  )
}

export default App