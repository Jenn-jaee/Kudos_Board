import React from 'react';
import './BoardFilter.css';

const categories = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

const BoardFilter = ({ filter, setFilter }) => {
  return (
    <div className="filter-container">
      {categories.map(category => (
        <button
          key={category}
          className={filter.toLowerCase() === category.toLowerCase() ? 'active' : ''}
          onClick={() => setFilter(category.toLowerCase())}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default BoardFilter;
