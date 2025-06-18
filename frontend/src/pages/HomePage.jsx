
import React, { useState } from 'react';
import BoardCard from '../components/BoardCard';
import SearchBar from '../components/SearchBar';
import BoardFilter from '../components/BoardFilter';
import NewBoardForm from '../components/NewBoardForm';
import './HomePage.css';

const initialBoards = [
  {
    id: 1,
    title: 'Congrats Interns!',
    description: 'Shoutout to our amazing interns for all their hard work!',
    category: 'Celebration',
    image: 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3',
    author: 'Jennifer'
  },
  {
    id: 2,
    title: 'Thank You, Team!',
    description: 'Big thanks to the product team for crushing Q2!',
    category: 'Thank You',
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659',
    author: 'Alex'
  }
];

function HomePage() {
  const [boards, setBoards] = useState(initialBoards);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);


  const handleCreateBoard = (newBoard) => {
    setBoards([newBoard, ...boards]);
  };

  const handleDeleteBoard = (id) => {
    setBoards(boards.filter(board => board.id !== id));
  };

  const filteredBoards = boards.filter(board => {
    const matchesSearch = board.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || board.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="homepage">
        <div className="homepage-content">
            <h1>Kudos Board Dashboard 🎉</h1>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <BoardFilter setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} />
        <button className="toggle-form-button" onClick={() => setShowForm(true)}>
        ➕ Create New Board
        </button>

        {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <NewBoardForm onCreate={(board) => {
                handleCreateBoard(board);
                setShowForm(false);
            }} />
            </div>
        </div>
        )}

            <div className="board-grid">
                {filteredBoards.length > 0 ? (
                filteredBoards.map(board => (
                    <BoardCard key={board.id} board={board} onDelete={handleDeleteBoard} />
                ))
                ) : (
                <p>No boards found. Try creating one!</p>
                )}
            </div>
            </div>
    </div>
  );
}

export default HomePage;
