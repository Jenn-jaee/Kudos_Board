import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardCard.css';

const BoardCard = ({ board }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/boards/${board.id}`);
  };

  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this board?')) {
      fetch(`http://localhost:5000/api/boards/${board.id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (res.ok) {
            alert('Board deleted successfully! Please refresh to see changes.');
          } else {
            alert('Failed to delete board.');
          }
        })
        .catch(err => {
          console.error('Error deleting board:', err);
          alert('Something went wrong.');
        });
    }
  };

  return (
    <div className="board-card">
      <img
        src={board.image || 'https://via.placeholder.com/150'} // prevent empty image
        alt={board.title}
        className="board-card-image"
      />
      <div className="board-card-content">
        <h3>{board.title}</h3>
        <p>{board.description}</p>
        <p><strong>Category:</strong> {board.category}</p>
        {board.author && <p><strong>Author:</strong> {board.author}</p>}

        <div className="card-buttons">
          <button className="view-button" onClick={handleViewClick}>View</button>
          <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
