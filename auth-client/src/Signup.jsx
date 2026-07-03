import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './Signup.css';
import {useNavigate,Link} from "react-router-dom"

// 1. ADD THIS: Get the API URL from your .env file
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  
  const submit = async (e) => {
    e.preventDefault();
    
    // 2. CHANGE THIS: Use ${API_URL} instead of the hardcoded localhost string
    const res = await axios.post(`${API_URL}/auth/signup`, data)
    
    alert(res.data.message)
    navigate("/")
  }

  return (
    <div className='signup-container'>
      <div className="signup-form">
        <form onSubmit={submit}>
          <h2>Signup</h2>
          <input type="text" placeholder='Name' onChange={(e) => setData({ ...data, name: e.target.value })} />

          <input type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />

          <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />

          <button>Signup</button>

        </form>
        <div>
          <p>Already have an account? <Link href="/">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup;