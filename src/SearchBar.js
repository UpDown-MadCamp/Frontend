// SearchBar.js
import React from 'react';
import './SearchBar.css';

function SearchBar() {
  const handleSearch = (event) => {
    // Implement the search logic or leave it for later implementation
    console.log('Search term:', event.target.value);
  };

  return (
    <div className="search-bar-container">
        
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        onKeyUp={handleSearch}
      />
      <p className="search-btn">search</p>
    </div>
  );
}

export default SearchBar;