import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth()

    if(loading) {
        return <div>Loading...</div>
    }

    // If no user, redirect to login
    if(!user) {
        return <Navigate to="/login" />
    }
    
    // Check if user has required role
    if(!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />
    }
    
    // User is authenticated and authorized
    return children
}

export default RoleBaseRoutes