import React, { useState } from 'react';
import './SearchBar.css';
import axios, { formToJSON } from 'axios';
import Blob from 'blob';
//import FileReader from 'filereader';

function SearchBar() {
  const [private_key, setprivate_key] = useState('');

  const handleSearch = (event) => {
    setprivate_key(event.target.value);
    console.log(private_key);
  };
  const download_file = async () => {
    try {

        const response = await axios.get('http://localhost:5000/files/download/' + private_key, {
            responseType: 'blob'
        });

        // Content-Disposition 헤더에서 파일명 추출
        const contentDisposition = response.headers['content-disposition'];
        let filename = "downloaded-file"; // 기본 파일명
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1];
            }
        }

        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(downloadUrl);

    } catch(error) {
        alert('잘못된 키입니다');
        console.error(error);
    }
};

  return (
    <div className="search-bar-container">
        
      <input
        type="text"
        placeholder="Search..."
        className="search-input-down"
        //value={private_key}
        onKeyUp={handleSearch}
      />
      <p className="search-btn" onClick={download_file}>search</p>
    </div>
  );
}

export default SearchBar;