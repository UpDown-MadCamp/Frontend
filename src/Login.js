import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Login.css';
import SignInModal from './SignInModal';
import axios from 'axios';
import { login } from './api';
import { setFiles } from './api';
import { useAuth } from './AuthContext';
import FileTypeRatioTable from './FileTypeRatioTable';


function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username_c, setusername_c] = useState('');
  const [password, setPassword] = useState('');
  //const handleInputChange = (event) => {
    //const { name, value } = event.target;
    //setCredentials({ ...credentials, [name]: value });
  //};
  const files_local = [
    { name: 'file_name1.pdf', size: '15KB', key:'failed to get upload files table' }
  ];
  sessionStorage.setItem('files', JSON.stringify(files_local));

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
        console.log(userData.data.user);
        sessionStorage.setItem('email',userData.data.user.email);
        sessionStorage.setItem('username', userData.data.user.username);
        sessionStorage.setItem('user', JSON.stringify(userData.data.user));
        sessionStorage.setItem('islogged', true)
        setFiles();
        window.location.reload();

      } else {
        sessionStorage.setItem('islogged', false)
        window.location.reload();
      }
      console.log('로그인 데이터:', userData);
      
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handlePasswordChange = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('islogged');
    window.location.reload();
  };


  const calculateTotalSize = (files) => {
    return files.reduce((total, file) => {
      const size = parseInt(file.size, 10);
      return total + size;
    }, 0);
  };

  const calculateFileTypeRatio = (files) => {
    const fileTypeCounts = files.reduce((counts, file) => {
      const extension = file.name.split('.').pop().toLowerCase();
      counts[extension] = (counts[extension] || 0) + 1;
      return counts;
    }, {});

    const totalFiles = files.length;
    return Object.entries(fileTypeCounts).reduce((ratios, [type, count]) => {
      ratios[type] = (count / totalFiles) * 100;
      return ratios;
    }, {});
  };
  const calculateEstimatedCost = (files) => {
    return "Basic: 0원";
  };
  const parseFileSize = (size) => {
    const sizeValue = parseInt(size, 10);
    return isNaN(sizeValue) ? 0 : sizeValue * 1024; // KB 단위를 바이트로 변환
  };
  const islogged = sessionStorage.getItem('islogged');
  const username = sessionStorage.getItem('username');
  const email = sessionStorage.getItem('email');

  const files = JSON.parse(sessionStorage.getItem('files') || '[]').map(file => ({
    ...file,
    size: parseFileSize(file.size)
  }));

  const totalSize = calculateTotalSize(files);
  const fileTypeRatio = calculateFileTypeRatio(files);
  const estimatedCost = calculateEstimatedCost(files);

  console.log(fileTypeRatio);

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
          <div className='text-column'> 
          <p> totalSize : {(totalSize/1024).toFixed(2)} KB </p>
          <p> {estimatedCost} 요금제 </p>  
          </div>
          <FileTypeRatioTable fileTypeRatio={fileTypeRatio} />
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