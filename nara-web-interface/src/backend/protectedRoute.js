import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, userRole, allowedRole }) => {
  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  // If the user's role doesn't match the allowed role, redirect to home
  if (userRole !== allowedRole) {
    return <Navigate to="/Home" />;
  }

  // If both checks pass, render the element
  return element;
};

export default ProtectedRoute;
