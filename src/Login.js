import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Login.css';
import SignInModal from './SignInModal';
import axios from 'axios';

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
      });
    
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  //const handleInputChange = (event) => {
    //const { name, value } = event.target;
    //setCredentials({ ...credentials, [name]: value });
  //};

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(form => ({
      ...form,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  // POST 요청은 body에 실어 보냄
  const response = await axios.post('http://143.248.197.207:3000/auth/login', {
        username: 'test',
        password: 'test'
    });

    if (response.status === 200) {
        console.log('SignIn Successful:', response.data);
        // Handle success - perhaps redirecting to another page or updating the UI
      } else {
        console.error('SignIn Failed:', response.status);
        // Handle errors, such as showing a user-friendly error message
      }

  } catch (e) {
    console.error(e);
  }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>

        <input className='input-text'
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        </label>
        <label>

        <input className='input-text'
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        </label>
        <button type="submit">Login</button>
      </form>

      <button onClick={handleOpenModal} className = "signButton">If not resgistered, Sign In</button>
      {isModalOpen && <SignInModal onClose={handleCloseModal} />}
    </div>
  );
}

export default Login;