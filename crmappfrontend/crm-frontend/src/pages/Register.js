import React, { useState } from 'react';
import axios from '../api/axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STAFF');

  const register = async () => {
    try {
      await axios.post('/auth/register', null, {
        params: { username, password, role }
      });
      alert('Registered!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="STAFF">STAFF</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
