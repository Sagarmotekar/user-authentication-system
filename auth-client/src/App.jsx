import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login';
import Dashboard from './Dashboard';  
import Signup from './Signup';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default App