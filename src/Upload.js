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
  const [currentPage_r, setCurrentPage] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const toggleSwitch = () => {
    if (!isEnabled) {
      alert("대용량 업로드 모드 15MB + ");
    } else {
      alert("저용량 업로드 모드 15MB - ");
    }
    setIsEnabled(!isEnabled)
  };

  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);
    // Function to perform deep comparison of arrays
    const arraysAreEqual = (array1, array2) => {
      if (array1.length !== array2.length) return false;
      for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
      }
      return true;
    };
  
    // Perform the filtering
    const results = files.filter(file =>
      file.filename.toLowerCase().includes(searchTerm.toLowerCase()) || 
      file.key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Update state only if the results are different
    if (!arraysAreEqual(results, filteredFiles)) {
      setFilteredFiles(results);
    }
  }, [searchTerm, files]);


  const islogged = sessionStorage.getItem('islogged')
  const email = sessionStorage.getItem('email');
  const totalSize = sessionStorage.getItem('totalSize');

  const handleSearchChange = (event) => {
    setCurrentPage(1);
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
      var url = "http://localhost:5000/files/upload";
      if (isEnabled) {
        url = "http://localhost:5000/files/uploadGrid";
      }
      const response = await axios.post(url, formData, {

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
      alert('업로드 실패, 파일 용량을 확인해보세요');
      console.error('업로드 실패:', error);
    }
  };
  

  

  return (
    <div className="upload-page">
       <MainPage />
        <div className="content-column-upload">

        {islogged ? (
          <div> 
             <div className="upload-content" >
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
              <button onClick={uploadFile} >upload </button>
              <label className="switch">
              <input type="checkbox" checked={isEnabled} onChange={toggleSwitch} />
              <span className="slider round"></span>
            </label>
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
           <FileList files={filteredFiles} currentPage_r = {currentPage_r} totalSize= {totalSize} />
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