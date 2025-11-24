import React from 'react'
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'



const Dashboard = () => {
  const { token,userName,logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout =() =>{
    logout();
    navigate("/");
  }
  return(
    <div className='dashboard-container'>
        <h1>Dashboard</h1>
        <p>Hi, {userName || "User"} 👋</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard
