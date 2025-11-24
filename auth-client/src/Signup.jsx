import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/auth/signup", data)
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
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
