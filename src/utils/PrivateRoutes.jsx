import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth()

    // Show loading indicator while checking authentication
    if(loading) {
        return <div>Loading...</div>
    }

    // If no user is found after loading, redirect to login
    if(!user) {
        return <Navigate to="/login" />
    }

    // User is authenticated, render the children
    return children
}

export default PrivateRoutes