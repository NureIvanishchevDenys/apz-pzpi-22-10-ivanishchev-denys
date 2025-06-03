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

type RegisterFormProps = {
  onRegisterSuccess: (userData: any) => void;
};


const RegisterForm:  React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let valid = true;
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = 'Введите имя';
      valid = false;
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Введите корректный email';
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = 'Пароль должен быть минимум 6 символов';
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return;
  
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        onRegisterSuccess(data.user);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || { email: 'Ошибка регистрации' });
        return;
      }
      alert('Регистрация прошла успешно!');
  
    } catch (error) {
      alert('Ошибка сервера, попробуйте позже.');
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={styles.formGroup}>
        <label style={styles.label}>Имя:</label>
        <input
          style={{
            ...styles.input,
            ...(errors.name ? styles.inputError : {}),
          }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ваше имя"
        />
        {errors.name && <div style={styles.errorText}>{errors.name}</div>}
      </div>
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
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
