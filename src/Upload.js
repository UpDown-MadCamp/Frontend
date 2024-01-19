import React, { useEffect, useState } from 'react';
import './Upload.css';
import MainPage from './MainPage';

function Upload() {
  const [animate, setAnimate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="upload-page">
       <MainPage />
        <div className="content-column-upload">
        
      <main className="upload-content">

      <header className="upload-header">
          <h1>Upload</h1>
        </header>
        {isLoggedIn ? (
          <div className="white-list"> {/* This would be your list component */}
            {/* List content goes here */}
          </div>
        ) : (
          <p className="login-prompt">로그인 하세요</p>
        )}
      </main>

      </div>
    </div>
  );
}

export default Upload;