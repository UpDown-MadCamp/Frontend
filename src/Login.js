import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Login.css';
import SignInModal from './SignInModal';
import axios from 'axios';
import { login } from './api';
import { useAuth } from './AuthContext';

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username_c, setusername_c] = useState('');
  const [password, setPassword] = useState('');
  const { username, setusername, email, setemail, isLoggedIn, setIsLoggedIn } = useAuth();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      console.log(username_c, password);
      const userData = await login(username_c, password);
      
      if (userData.status === 200) {
        setemail(userData.data.user.email);
        setusername(userData.data.user.username);
        setIsLoggedIn(true);
        sessionStorage.setItem('user', JSON.stringify(userData.data.user));
        sessionStorage.setItem('islogged', true)
        window.location.reload();

      } else {
        setIsLoggedIn(false);
        sessionStorage.setItem('islogged', false)
        window.location.reload();
      }
      console.log('로그인 데이터:', userData);
      
    } catch (error) {
      setIsLoggedIn(false);
      console.error('로그인 실패:', error);
    }
  };

  const handlePasswordChange = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('islogged');
    window.location.reload();
  };
  const islogged = sessionStorage.getItem('islogged');

  return (
    <div>
      
      {islogged ? (
        <div className='login-page'>
            <div className="container">
            <div className="section">
              <h1 className="header">mypage</h1>
              <p className="info"><strong>내 이름</strong> {username}</p>
              <p className="info"><strong>내 이메일</strong> {email}</p>
            </div>
            <div className="section">
              <p className="welcomeMessage">welcome to updown </p>
              <button onClick={handlePasswordChange} className="editButton">로그아웃 하기</button>
            </div>
          </div>

          <div className='container-sub'>
          <p> 총 사용 용량 및 결제 내역 </p>  
          </div>
          </div>
      ): (
        <div className='login-page'>
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input className='input-text'
              type="text"
              name="username"
              placeholder="Username"
              value={username_c}
              onChange={(e) => setusername_c(e.target.value)}
              required
            />
    
    
            <input className='input-text'
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
    
            <button type="submit">Login</button>
          </form>
    
          <button onClick={handleOpenModal} className = "signButton">If not resgistered, Sign In</button>
          {isModalOpen && <SignInModal onClose={handleCloseModal} />}
          </div>
      )}
      
    </div>
  );
}

export default Login;