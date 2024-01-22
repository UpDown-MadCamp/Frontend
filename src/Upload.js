import React, { useEffect, useState } from 'react';
import './Upload.css';
import MainPage from './MainPage';
import { useAuth } from './AuthContext';
import FileList from './FileList';
import axios from 'axios';

function Upload() {
  const [animate, setAnimate] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const files = [
    { name: 'file_name1.pdf', size: '15MB' },
    { name: 'file_name2.png', size: '12KB' }
  ];
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);
  }, []);

  const islogged = sessionStorage.getItem('islogged')

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
      console.log('서버 응답:', response.data);
      setSelectedFile();
    } catch (error) {
      alert('업로드 실패');
      console.error('업로드 실패:', error);
    }
  };


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
              파일 선택완료
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