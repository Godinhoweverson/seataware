import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
// Components
import Navbar from './components/NavBar/NavBar'

// Pages
import Home from './pages/Home'
import Reports from './pages/Reports'
import ReportsIssue from './pages/ReportsIssue'
import Map from './pages/Map'
import Dashboard from './pages/Dashboard'
import Awareness from './pages/Awareness' 

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reportsIssue" element={<ReportsIssue />} />
        <Route path="/map" element={<Map />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/awareness" element={<Awareness />} />
      </Routes>
    </>
  )
}

export default App
