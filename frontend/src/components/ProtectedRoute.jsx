import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Use useSelector to get the authentication state from Redux
    const { isAuthenticated } = useSelector((state) => state.auth);

    // If the user is authenticated, render the child route (e.g., Dashboard).
    // Otherwise, redirect them to the login page.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;