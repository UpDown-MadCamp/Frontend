import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import DownloadPage from './DownloadPage';
import MainPage from './MainPage'
import SecondPage from './SecondPage';
import Login from './Login';
import Upload from './Upload';
import SignInModal from './SignInModal';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';

function App() {
  const islogged = sessionStorage.getItem('islogged');

  return (
    <BrowserRouter>
    <AuthProvider>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-logo" >Upload</Link>
          <div className ="nav-button-container"> 
          <Link to="/upload" className="nav-button">upload</Link>
          <Link to="/download" className="nav-button">download</Link>
          {islogged? (<Link to="/login" className="login-button">My page</Link>) : (<Link to="/login" className="login-button">login</Link>)}
          
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
            <MainPage />
            <SecondPage />
            </>
          } />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/signin" element={<SignInModal />}/>
        </Routes>
        <footer className="footer">
          <div className="footer-text">© 2024 Updown your files now</div>
        </footer>
      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
