import React from 'react'
import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });


    const submit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:4000/auth/login", data);
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
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>

        </div>
    )
}

export default Login
