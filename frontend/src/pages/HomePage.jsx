import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import BoardFilter from '../components/BoardFilter';
import BoardCard from '../components/BoardCard';
import BoardModal from '../components/BoardModal';

import './HomePage.css';

function HomePage({ toggleTheme, theme }) {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'celebration',
    image: '',
    author: '',
  });

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = () => {
    fetch('http://localhost:5000/api/boards')
      .then(res => res.json())
      .then(data => {
        setBoards(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching boards:', err);
        setLoading(false);
      });
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

// random image

const randomNumber = Math.random();

  const cleanedFormData = {
    ...formData,
    image: formData.image.trim() === ''
      ? `https://picsum.photos/200/300?random=${randomNumber}`
      : formData.image,
  };

  console.log('🔍 Submitting board:', cleanedFormData);

  fetch('http://localhost:5000/api/boards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cleanedFormData),
  })
    .then(async res => {
      const data = await res.json();

      if (!res.ok) {
        console.error('❌ Server responded with error:', data);
        throw new Error(data.error || 'Unknown error');
      }

      setBoards(prev => [data, ...prev]);
      setFormData({ title: '', description: '', category: 'celebration', image: '', author: '' });
      setShowForm(false);
    })
    .catch(err => {
      console.error('🔥 Caught error while submitting:', err.message);
      alert(`Failed to create board: ${err.message}`);
    });
};


//handle delete button

  const applyFilter = () => {
    if (filter === "recent") 
      {return boards.slice(0, 6)}
    else 
    {
      return boards.filter(board => {
      const matchesCategory = filter === 'all' || board.category.toLowerCase() === filter;
      const matchesSearch = board.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
      })
    
  }};
  const filteredBoards = applyFilter();

  const handleDeleteBoard = (boardId) => {
    setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));

  }

  return (
    <div className="home-container">
      <div className="controls-container">

        <Header/>
        <SearchBar search={search} setSearch={setSearch} />
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>

        <BoardFilter filter={filter} setFilter={setFilter} />

        <button className="createBoardBtn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Board'}
        </button>
      </div>

      {showForm && (
        <BoardModal
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Loading boards...</p>
      ) : filteredBoards.length === 0 ? (
        <p>No boards found. Try adjusting your filter or search!</p>
      ) : (
        <div className="boards-grid">
          {filteredBoards.map(board => (
            <BoardCard key={board.id} board={board} onDeleteBoard={handleDeleteBoard}/>
          ))}
        </div>
      )}
      <Footer/>
    </div>
    
  );
}

export default HomePage;
