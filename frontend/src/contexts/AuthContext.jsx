import {createContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { showNotification } from "../utils/useNotification";


const apiBaseUrl = import.meta.env.VITE_API_URL // back-end base url. 


const AuthContext = createContext(); // creates AuthContext

export default AuthContext

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );
  

  const [user, setUser] = useState(() => 
    localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null
  );


  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  


  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${apiBaseUrl}/auth-api/token/`, {
        method: 'POST',
        headers:{ 'Content-Type' : 'application/json' },
        body: JSON.stringify({email, password})
      })

      if(!response.ok) {
        throw new Error(response.statusText);
      }
      
      const data = await response.json()

      // console.log(data);

      // console.log("Logged In");

      setAuthTokens(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem("authTokens", JSON.stringify(data))
      navigate('/home')
      
      showNotification('Login Successful', 'success');

    } catch (error) {    
      showNotification('Login Failed. Check your credentials or try again later.', 'error');
      
      console.error('Login error:', error);

      
    }
  }

  const registerUser = async (email, username, password, password2) => {
    try {
      const response = await fetch(`${apiBaseUrl}/auth-api/user-signup/`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ email, username, password, password2 })
      })

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      navigate('/login')
      showNotification('Registration Successful, Login Now', 'success');
      
    } catch(error) {
      showNotification('Registration failed ' + error.message, 'error');
      
      console.error('Registration error: ' + error);
      // console.log("there was a server issue");
    }
  }
  
  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login') // navigate to login page
    
    showNotification('You have been logged out.', 'success');
  }

  const contextData = {
    user, 
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  }

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access))
    }
    setLoading(false)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}