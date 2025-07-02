import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async() => {
            const token = localStorage.getItem('token')
            
            // If no token exists, just set loading to false and return early
            if(!token) {
                setLoading(false)
                return
            }
            
            try {
                const response = await axios.get('https://employee-salary-leave-api-nn9s.vercel.app/api/auth/verify', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    } 
                })
                
                if(response.data.success) {
                    setUser(response.data.user)
                } else {
                    // Clear invalid authentication
                    setUser(null)
                    localStorage.removeItem("token")
                }
            } catch(error) {
                console.error("Auth verification error:", error)
                // On error, consider the user as not authenticated
                setUser(null)
                localStorage.removeItem("token")
            } finally {
                setLoading(false)
            }
        }
        
        verifyUser()
    }, [])

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{user, login, logout, loading}}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);