import React from 'react';
import './SearchBar.css';

function SearchBar({ search, setSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Nothing extra needed since the filtering happens on the parent
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search boards by title..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
