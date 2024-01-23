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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);
  const files = JSON.parse(sessionStorage.getItem('files') || '[]');
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);
    const results = files.filter(file =>
      file.filename.toLowerCase().includes(searchTerm.toLowerCase())||file.key.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredFiles(results);
  }, [searchTerm, files]);


  const islogged = sessionStorage.getItem('islogged')
  const email = sessionStorage.getItem('email');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
              <div>
                <input
                  type="text"
                  placeholder="파일 검색..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className='search-input'
                />
              </div>
              </div>
              </div>
           <FileList files={filteredFiles} totalSize="total 300 MB / 1GB" />
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