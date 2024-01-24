import React, { useState } from 'react';
import './SignInModal.css';
import axios from 'axios';

function SignInModal({ onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Here you would handle the sign-in logic, possibly sending data to a server
    console.log('Form data submitted:', formData);
    onClose(); // Close the modal on successful submission
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', {username:formData.username, password:formData.password, email:formData.email}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        alert('회원가입 성공!');
        console.log('success');
        onClose();
      } else {
        alert('이미 존재하는 아이디입니다');
        console.log('failed');
      }
    } catch (error) {
      alert('이미 존재하는 아이디입니다');
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" onClick={signIn}>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;