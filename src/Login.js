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

  //const handleInputChange = (event) => {
    //const { name, value } = event.target;
    //setCredentials({ ...credentials, [name]: value });
  //};

  //const files_local = [{ name: 'file_name1.pdf', size: '15KB', key:'failed to get upload files table' }];
  //sessionStorage.setItem('files', JSON.stringify(files_local));


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
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
          console.error('Server Response:', error.response.data);
      }
      setMessage('Failed to send email.');
  }
  };

  const files = JSON.parse(sessionStorage.getItem('files') || '[]').map(file => ({
    ...file,
    size: parseFileSize(file.size)
  }));

  const totalSize = calculateTotalSize(files);
  sessionStorage.setItem('totalSize',totalSize);
  const fileTypeRatio = calculateFileTypeRatio(files);
  const estimatedCost = calculateEstimatedCost(files);

  console.log(fileTypeRatio);

  const handleUsernameClick = () => {
    setIsEditing(true);
    const newUsername = window.prompt('Enter new Username:', username);
    if (newUsername) {
      setNewUsername(newUsername);
    }
    sessionStorage.setItem('username', newUsername);
    setIsEditing(false);
  };
  const handleEditSubmit = async () => {
    alert('내 이름을 눌러 수정해주세요');

    try {
        const response = await axios.put('http://localhost:5000/auth/edit/', {
            email: email, // 현재 로그인된 사용자의 이메일
            newUsername: newUsername // 새로운 사용자 이름
        });
        console.log(response.data.message);
        window.location.reload();
        // 성공적으로 업데이트되었다면, 사용자에게 알리고 필요한 상태를 업데이트하세요.
    } catch (error) {
        console.error(error);
        alert("Error editing the file");
    }
  }

  // 내 정보 수정 클릭 핸들러
/*  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
        // 현재 로그인된 사용자의 이메일을 사용하여 요청을 보냅니다.
        const response = await axios.put('http://localhost:5000/auth/edit', {
            email: email, // 현재 로그인된 사용자의 이메일
            newUsername: newUsername // 새로운 사용자 이름
        });
        console.log(response.data.message);
        setIsEditing(false);
        // 페이지 리로드 또는 상태 업데이트
        // 예를 들어, 세션 스토리지의 username을 업데이트하고, 화면을 새로고침합니다.
        sessionStorage.setItem('username', newUsername);
        window.location.reload();
    } catch (error) {
        console.error('Error updating user:', error);
        alert('사용자 정보를 수정하는 데 실패했습니다.');
    }
  };*/

  return (
    <div>
      
      {islogged ? (
        <div className='login-page'>
            <div className="container">
            <img src={updownGif} alt="GIF" style={{ maxWidth: '10%', height: '30%', padding:'15px', marginLeft:'10px'}} />
            <div className="section">
              <h1 className="header">mypage</h1>
              <p onClick={handleUsernameClick} className="info"><strong>내 이름</strong> {username}</p>
              <p className="info"><strong>내 이메일</strong> {email}</p>
            </div>
            
            <div className="section">
              <p className="welcomeMessage">welcome to updown </p>
              <button onClick={handleEditSubmit} className="editButton">내 정보 수정하기</button>
              <button onClick={handleMailSubmit} className="mailButton">메일 보내기</button>
              <button onClick={handlePasswordChange} className="editButton">로그아웃 하기</button>
            </div>
          </div>

          <div className='container-sub'>
          <div className='text-column'> 
          <p> totalSize : {totalSize.toFixed(0)} KB </p>
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