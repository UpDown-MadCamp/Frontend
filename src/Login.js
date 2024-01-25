import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Login.css';
import SignInModal from './SignInModal';
import axios from 'axios';
import { login } from './api';
import { setFiles } from './api';
import { useAuth } from './AuthContext';
import FileTypeRatioTable from './FileTypeRatioTable';
import updownGif from './updown.gif';
import GoogleLoginButton from './GoogleLoginButton';

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username_c, setusername_c] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');

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
        sessionStorage.setItem('email', userData.data.user.email);
        sessionStorage.setItem('username', userData.data.user.username);
        sessionStorage.setItem('user', JSON.stringify(userData.data.user));
        sessionStorage.setItem('islogged', true)
        setFiles();
      } else {
        alert('비밀번호 또는 유저네임이 잘못됐습니다');
        sessionStorage.setItem('islogged', false)
        sessionStorage.removeItem('files');
        window.location.reload();
      }
      console.log('로그인 데이터:', userData);
      
    } catch (error) {
      alert('비밀번호 또는 유저네임이 잘못됐습니다');
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
      const size = (parseFloat((file.size/1024).toFixed(2))/1000);
      return total + size;
    }, 0);
  };

  const calculateFileTypeRatio = (files) => {
    const fileTypeCounts = files.reduce((counts, file) => {
      const extension = file.filename.split('.').pop().toLowerCase();
      counts[extension] = (counts[extension] || 0) + 1;
      return counts;
    }, {});

    const totalFiles = files.length;
    return Object.entries(fileTypeCounts).reduce((ratios, [type, count]) => {
      ratios[type] = (count / totalFiles) * 100;
      return ratios;
    }, {});
  };

  const calculateFileSizeRatio = (files) => {
    const fileSizeSums = files.reduce((sums, file) => {
      const extension = file.filename.split('.').pop().toLowerCase();
      sums[extension] = (sums[extension] || 0) + file.size;
      return sums;
    }, {});
  
    const totalSize = Object.values(fileSizeSums).reduce((total, size) => total + size, 0);
  
    const fileSizeRatios = Object.keys(fileSizeSums).reduce((ratios, key) => {
      ratios[key] = (fileSizeSums[key] / totalSize) * 100;
      return ratios;
    }, {});
  
    return fileSizeRatios;
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

  // 메일 전송 버튼 클릭 핸들러
  const handleMailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/mail/send/', { email });
      console.log(response);
      alert(response.data);
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
          console.error('Server Response:', error.response.data);
      }
      alert('Failed to send email.');
  }
  };

  const files = JSON.parse(sessionStorage.getItem('files') || '[]').map(file => ({
    ...file,
    size: parseFileSize(file.size)
  }));

  const totalSize = calculateTotalSize(files);
  sessionStorage.setItem('totalSize',totalSize);
  const fileTypeRatio = calculateFileTypeRatio(files);
  const fileSizeRatio = calculateFileSizeRatio(files);
  const estimatedCost = calculateEstimatedCost(files);

  console.log(fileTypeRatio);

  const handleEditSubmit = async () => {
    setIsEditing(true);
    try {
        sessionStorage.setItem('username', newUsername);
        const response = await axios.put('http://localhost:5000/auth/edit/', {
            email: email, // 현재 로그인된 사용자의 이메일
            newUsername: newUsername // 새로운 사용자 이름
        });
        console.log(response.data.message);
        window.location.reload();
        setIsEditing(false);
      
        // 성공적으로 업데이트되었다면, 사용자에게 알리고 필요한 상태를 업데이트하세요.
    } catch (error) {
        console.error(error);
        alert("Error editing the file");
    }
  }

  return (
    <div>
      {islogged ? (
        <div className='login-page'>
          <div className="container">
            <img src={updownGif} alt="GIF" style={{ maxWidth: '10%', height: '30%', marginLeft:'7%', margin:'3% 5px'}} />
            <div className="section">
              <h1 className="header">mypage</h1>
              <p className="info"><strong>내 이름</strong> {username}</p>
              <p className="info"><strong>내 이메일</strong> {email}</p>
            </div>

            <div className="section_text">
              <p className="welcomeMessage">welcome to updown </p>
            </div>
            <div className="section">
              {isEditing ? (
                <div className='section_text'>
                  <form>
                      <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className='user-input'
                          required
                      />
                      <button type="submit" onClick={handleEditSubmit} className='userEditButton'>저장하기</button>
                  </form>
                </div>
              ) : (
                <>
                  <button onClick={handlePasswordChange} className="editButton">로그아웃 하기</button>
                  <button onClick={() => setIsEditing(true)} className="userEditButton">내 이름 수정하기</button>
                  <button onClick={handleMailSubmit} className="userEditButton">메일 보내기</button>
                </>
              )}
            </div>
          </div>

          <div className='container-sub' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='text-column' > 
              <p> totalSize : {totalSize.toFixed(0)} KB </p>
              <p> {estimatedCost} 요금제 </p>  
            </div>
            
          <FileTypeRatioTable fileTypeRatio={fileTypeRatio} fileSizeRatio={fileSizeRatio} />
          
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
            <GoogleLoginButton />
          </form>
          <button onClick={handleOpenModal} className = "signButton">If not resgistered, Sign In</button>
          {isModalOpen && <SignInModal onClose={handleCloseModal} />}
        </div>
      )}
    </div>
  );
}

export default Login;