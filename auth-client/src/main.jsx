import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './AuthContext'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> {/* <-- ADD THIS */}
    <BrowserRouter>
      <AuthProvider>    
        <App />
      </AuthProvider>
    </BrowserRouter>
     </GoogleOAuthProvider> 
)
