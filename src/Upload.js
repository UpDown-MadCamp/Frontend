import React, { useEffect, useState } from 'react';
import './Upload.css';
import MainPage from './MainPage';
import { useAuth } from './AuthContext';
import FileList from './FileList';
import axios from 'axios';
import {setFiles} from './api';

function Upload() {
  const [animate, setAnimate] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const files_local = [
    { name: 'file_name1.pdf', size: '15KB', key:'failed to get upload files table' }
  ];

  sessionStorage.setItem('files', JSON.stringify(files_local));
  
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);
  }, []);

  const islogged = sessionStorage.getItem('islogged')
  const email = sessionStorage.getItem('email');

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email',email);

    try {
      const response = await axios.post('http://localhost:5000/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        alert(response.data.fileKey+"로 저장됐습니다");
        console.log('서버 응답:', response.data);
        setFiles();
      } else {
        alert(response.data.message);
        console.log(response.data);
        setFiles();
      }
    } catch (error) {
      alert('업로드 실패');
      console.error('업로드 실패:', error);
    }
  };
  

  const files = JSON.parse(sessionStorage.getItem('files') || '[]');

  return (
    <div className="upload-page">
       <MainPage />
        <div className="content-column-upload">

        {islogged ? (
          <div> 
             <div className="upload-content">
              <header className="upload-header">
                <h1>Upload</h1>
              </header>
              <input type="file" id="fileInput" className="fileInput" onChange={handleFileSelect} />
              <div className="button-row">
              {!selectedFile? (<label htmlFor="fileInput" className="fileInputLabel">
              파일 선택하기
              </label>):(<label htmlFor="fileInput" className="fileInputLabel_end">
              {selectedFile.name}______{(selectedFile.size/1024).toFixed(2)}KB
              </label>)}
              
              <button onClick={uploadFile} >upload</button>
              </div>
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