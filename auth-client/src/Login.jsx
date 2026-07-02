import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// 1. ADD THIS: Get the API URL from your .env file
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const submit = async (e) => {
        e.preventDefault();
        
        // 2. CHANGE THIS: Use ${API_URL} instead of the hardcoded localhost string
        const res = await axios.post(`${API_URL}/auth/login`, data);
        
        if (res.data.success) {
            login(res.data.token, res.data.userName);
            alert("login successful");
            navigate("/dashboard");
        }
        else {
            alert(res.data.message)
        }
    }

    return (
        <div className='login-container'>
            <div className='login-form'>
                <form onSubmit={submit}>
                    <h2>Login</h2>

                    <input type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />

                    <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />

                    <button>Login</button>
                </form>
                <div>
                    <p>Don't have an account? <link href="/signup">Sign Up</link></p>
                </div>
            </div>
        </div>
    )
}

export default Login