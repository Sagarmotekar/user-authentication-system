import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Only this is needed for frontend!
import './Login.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
            if (res.data.success) {
                login(res.data.token, res.data.userName);
                navigate("/dashboard");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // This function handles the Google button click
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // We send the token to the backend. The backend uses 'client' to verify it.
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, {
                token: credentialResponse.credential
            });

            if (res.data.success) {
                login(res.data.token, res.data.userName);
                navigate("/dashboard");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Google login failed:", error);
            alert("Google login failed. Please try again.");
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <form onSubmit={submit}>
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <button type="submit">Login</button>
                </form>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.log('Google Login Failed')}
                    />
                </div>

                <div>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login