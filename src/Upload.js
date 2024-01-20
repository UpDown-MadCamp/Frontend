import React, { useEffect, useState } from 'react';
import './Upload.css';
import MainPage from './MainPage';
import { useAuth } from './AuthContext';
import FileList from './FileList';

function Upload() {
  const [animate, setAnimate] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const files = [
    { name: 'file_name1.pdf', size: '15MB' },
    { name: 'file_name2.png', size: '12KB' }
  ];
  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="upload-page">
       <MainPage />
        <div className="content-column-upload">

        {isLoggedIn ? (
          <div> 
             <div className="upload-content">
              <header className="upload-header">
                <h1>Upload</h1>
              </header>
              </div>
           <FileList files={files} totalSize="total 300 MB / 1GB" />
           </div>
        ) : (

          <div className="upload-content">
          <header className="upload-header">
              <h1>Upload</h1>
            </header>
            <p className="login-prompt">로그인 하세요</p>
            </div>

        )}

      </div>
    </div>
  );
}

export default Upload;