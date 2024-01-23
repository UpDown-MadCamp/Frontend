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
      responseType: 'blob'  // 중요: 파일 데이터를 blob으로 받기
  });

  // Content-Disposition 헤더에서 파일명 추출
  const contentDisposition = response.headers['content-disposition'];
  let filename = "downloaded-file";
  if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.?)"?/);
      if (match) filename = match[1];
  }

    const reader = new FileReader();
    
    const blob = new Blob([response.data]);
    const link = document.createElement("a");

    //reader.readAsArrayBuffer(blob)

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link); // 링크를 DOM에 추가
    link.click();
    document.body.removeChild(link); // 다운로드 후 링크 제거

    // URL 객체 정리
    window.URL.revokeObjectURL(link.href);

  } catch(error) {
    console.log(error);
  }
  }

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