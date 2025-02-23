import React from 'react'
import './style.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
const App = () => {
  return (
    <div className="app-container">
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App