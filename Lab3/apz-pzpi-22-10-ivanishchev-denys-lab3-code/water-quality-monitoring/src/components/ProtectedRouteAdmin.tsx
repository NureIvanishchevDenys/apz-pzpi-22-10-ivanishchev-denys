import React, { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }: { children: ReactElement }) => {
  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;