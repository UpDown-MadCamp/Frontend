// DownloadPage.js
import React from 'react';
import './DownloadPage.css';
import SearchBar from './SearchBar';
import MainPage from './MainPage';

function DownloadPage() {
    return (
        <div className="download-page">

        <div className="content-column">
        <header className="download-header">
          <h1>Download</h1>
        </header>
        <SearchBar />
        <p className="korean-text">개인키를 입력해서 파일을 다운로드 받으세요</p>
      </div>
        <MainPage />
        </div>
      );
}

export default DownloadPage;