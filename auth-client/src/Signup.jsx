import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

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
    
    // NO MORE ALERTS! We will use console.log to see exactly what happens.
    console.log("1. Submit function started!");
    console.log("2. API URL is:", API_URL);
    console.log("3. Data to send:", data);
    
    try {
        console.log("4. Sending POST request to backend...");
        const res = await axios.post(`${API_URL}/auth/signup`, data);
        
        console.log("5. Backend replied with:", res.data);
        
        // Check if the backend actually succeeded
        if (res.data.success) {
             alert("Sign Up successful");
            navigate("/");
        } else {
            console.log("6. Backend said failed:", res.data.message);
        }
        
    } catch (error) {
        console.error("❌ ERROR CAUGHT:", error);
        if (error.response) {
            console.error("Server Status:", error.response.status);
            console.error("Server Data:", error.response.data);
        } else {
            console.error("Network Error:", error.message);
        }
    }
  }

  return (
    <div className='signup-container'>
      <div className="signup-form">
        <form onSubmit={submit}>
          <h2>Signup</h2>
          <input type="text" placeholder='Name' onChange={(e) => setData({ ...data, name: e.target.value })} />
          <input type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
          
          <button type="submit">Signup</button>
        </form>
        <div>
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup;