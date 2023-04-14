// SearchBox.js
import React, { useState, useEffect } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.length >= 3) {
      onSearch(searchTerm);
    } else {
      onSearch('');
    }
  }, [searchTerm, onSearch]);

  return (
    <form>
        <input
          id="search-box"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
