import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  email: string;
  role: 'user' | 'admin';
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const changeRole = async (id: number, role: 'user' | 'admin') => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    });
    setUsers(users.map(u => (u.id === id ? { ...u, role } : u)));
  };

  return (
    <div>
      <h2>Користувачі</h2>
      <table>
        <thead><tr><th>Email</th><th>Роль</th><th>Дія</th></tr></thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => changeRole(user.id, user.role === 'admin' ? 'user' : 'admin')}>
                  Змінити роль
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
