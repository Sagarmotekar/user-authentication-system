import {createContext,useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [token,setToken] = useState(localStorage.getItem("token") || null)
    const [userName,setUserName] = useState(localStorage.getItem("userName") || "");
    
    const login = (tok,userName) =>{
        localStorage.setItem("token",tok);
        localStorage.setItem("userName", userName);
        setToken(tok);
        setUserName(userName);
    }

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setToken(null);
        setUserName("");
    }

    return(
        <AuthContext.Provider value ={{token,userName,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

