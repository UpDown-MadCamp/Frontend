
import React, { useState } from 'react';
import './DownloadPage.css';
import SearchBar from './SearchBar';
import MainPage from './MainPage';
import { download } from './api';

function DownloadPage() {
  const [Private_key, setPrivate_key] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(Private_key);
      const fileData = await download(Private_key);
      
      if (fileData.status === 200) {
        
        window.location.reload();
      } else {
        
        window.location.reload();
      }
      console.log('다운로드 데이터:', fileData);
      
    } catch (error) {

      console.error('다운로드 실패:', error);
    }
  };

    return (
        <div className="download-page">
          
        <div className="content-column">
        <header className="download-header">
          <h1>Download</h1>
        </header>
        <SearchBar onClick={handleSubmit} />
        <p className="korean-text">개인키를 입력해서 파일을 다운로드 받으세요</p>
      </div>
        <MainPage />
        </div>
      );
}

export default DownloadPage;