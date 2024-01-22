import React, { useState } from 'react';
import './SearchBar.css';
import axios from 'axios';

function SearchBar() {
  const [private_key, setprivate_key] = useState('');

  const handleSearch = (event) => {
    setprivate_key(event.target.value);
    console.log(private_key);
  };
  const download_file = () => {
    try {
    const response = axios.get('http://localhost:5000/files/download/'+private_key, {
      //params: { key: private_key }
    });

    if (response.status === 404) {
      alert(response.data.message);
      console.log('');
    } else if (response.status === 200){
      alert('파일을 다운로드 받으세요');
      console.log(response.data);

    } else {
      console.log(Object.keys(response));
    }
  } catch(error) {
    console.log(error);
  }
  }

  return (
    <div className="search-bar-container">
        
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        //value={private_key}
        onKeyUp={handleSearch}
      />
      <p className="search-btn" onClick={download_file}>search</p>
    </div>
  );
}

export default SearchBar;