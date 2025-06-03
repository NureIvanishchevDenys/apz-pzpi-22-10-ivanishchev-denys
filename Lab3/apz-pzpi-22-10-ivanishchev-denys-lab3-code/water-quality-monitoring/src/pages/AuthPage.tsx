import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const styles = {
  container: {
    maxWidth: 400,
    margin: '40px auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  toggleButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: (active: boolean) => ({
    flex: 1,
    padding: '10px 0',
    cursor: active ? 'default' : 'pointer',
    backgroundColor: active ? '#4f46e5' : '#e0e0e0',
    color: active ? '#fff' : '#333',
    border: 'none',
    borderRadius: 4,
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    marginLeft: active ? 0 : 10,
  }),
};

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleLoginSuccess = (userData: any) => {
    console.log('Успешный вход:', userData);
  };

  const handleRegisterSuccess = (userData: any) => {
    console.log('Успешная регистрация:', userData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.toggleButtons}>
        <button
          style={styles.toggleButton(isLogin)}
          onClick={() => setIsLogin(true)}
          disabled={isLogin}
        >
          Войти
        </button>
        <button
          style={styles.toggleButton(!isLogin)}
          onClick={() => setIsLogin(false)}
          disabled={!isLogin}
        >
          Регистрация
        </button>
      </div>
      {isLogin ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      )}
    </div>
  );
};

export default AuthPage;
