import React from 'react';
import './BoardFilter.css';

const categories = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

function BoardFilter({ setCategoryFilter, categoryFilter }) {
  return (
    <div className="board-filter">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCategoryFilter(category)}
          className={categoryFilter === category ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default BoardFilter;
