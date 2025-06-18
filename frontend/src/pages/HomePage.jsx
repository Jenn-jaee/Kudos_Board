import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import BoardFilter from '../components/BoardFilter';
import BoardCard from '../components/BoardCard';
import './HomePage.css';

function HomePage() {
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

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(newBoard => {
        setBoards(prev => [newBoard, ...prev]);
        setFormData({ title: '', description: '', category: 'celebration', image: '', author: '' });
        setShowForm(false);
      })
      .catch(err => console.error('Error creating board:', err));
  };

  const filteredBoards = boards.filter(board => {
    const matchesCategory = filter === 'all' || board.category.toLowerCase() === filter;
    const matchesSearch = board.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-container">
      <div className="controls-container">

        <h1>Kudos Dashboard</h1>


        <SearchBar search={search} setSearch={setSearch} />
        <BoardFilter filter={filter} setFilter={setFilter} />

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Board'}
        </button>
      </div>

      {showForm && (
        <form className="new-board-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="celebration">Celebration</option>
            <option value="thank you">Thank You</option>
            <option value="inspiration">Inspiration</option>
          </select>
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
          <input type="text" name="author" placeholder="Author (optional)" value={formData.author} onChange={handleChange} />
          <button type="submit">Create Board</button>
        </form>
      )}

      {loading ? (
        <p>Loading boards...</p>
      ) : filteredBoards.length === 0 ? (
        <p>No boards found. Try adjusting your filter or search!</p>
      ) : (
        <div className="boards-grid">
          {filteredBoards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
      <Footer/>
    </div>
    
  );
}

export default HomePage;
