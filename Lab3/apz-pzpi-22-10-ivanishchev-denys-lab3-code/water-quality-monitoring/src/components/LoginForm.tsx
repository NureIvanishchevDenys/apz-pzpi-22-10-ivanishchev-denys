import React, { useState } from 'react';

const styles = {
  formGroup: { marginBottom: 15 },
  label: { display: 'block', marginBottom: 6, fontWeight: '600', color: '#333' },
  input: {
    width: '100%',
    padding: '8px 10px',
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
    boxSizing: 'border-box' as 'border-box',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 16,
  },
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

type LoginFormProps = {
  onLoginSuccess: (userData: any) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    if (!validateEmail(email)) {
      setErrors({ email: 'Неверный формат email' });
      return;
    }
    if (password.length < 6) {
      setErrors({ password: 'Пароль должен быть не менее 6 символов' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('role', data.user.role);
        onLoginSuccess(data.user);
      } else {
        setErrors({ email: data.message || 'Неверный логин или пароль' });
      }
    } catch (error) {
      alert('Ошибка сервера, попробуйте позже.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={styles.formGroup}>
        <label style={styles.label}>Email:</label>
        <input
          style={{
            ...styles.input,
            ...(errors.email ? styles.inputError : {}),
          }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@mail.com"
        />
        {errors.email && <div style={styles.errorText}>{errors.email}</div>}
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Пароль:</label>
        <input
          style={{
            ...styles.input,
            ...(errors.password ? styles.inputError : {}),
          }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
        {errors.password && <div style={styles.errorText}>{errors.password}</div>}
      </div>
      <button style={styles.button} type="submit">
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
