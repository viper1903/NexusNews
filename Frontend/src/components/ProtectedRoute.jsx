import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from './Spinner'; // Import a spinner for a better UX

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // While we're checking for a token, show a loading spinner
    return <Spinner />;
  }

  if (!user) {
    // If loading is done and there's still no user, redirect
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;