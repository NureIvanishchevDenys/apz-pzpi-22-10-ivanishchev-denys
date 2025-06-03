import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage';
import StationsPage from './pages/StationsPage';
import AdminPage from './pages/AdminPage';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };
  const isAuthenticated = Boolean(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/stations" />
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/stations" />
            ) : (
              <RegisterForm onRegisterSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/stations"
          element={
            isAuthenticated ? (
              <StationsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Можно добавить 404 страницу */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/admin"
          element={
            <ProtectedRouteAdmin>
              <AdminPage />
            </ProtectedRouteAdmin>
          }
        />
        <Route path="/unauthorized" element={<div>У доступі відмовлено</div>} />
      </Routes>
    </Router>
  );
};

export default App;
