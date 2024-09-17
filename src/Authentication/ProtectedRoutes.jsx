// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path to your AuthContext

const ProtectedRoute = ({ element, roles, ...rest }) => {
  const { currentUser, role } = useAuth(); // Assume `useAuth` provides `role`

  // If the user is not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/admin-login" replace />;
  }

  // If the user's role is not included in the allowed roles, redirect to home or an error page
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // If the user is logged in and has the required role, render the element
  return element;
};

export default ProtectedRoute;
