import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardCard.css';

const BoardCard = ({ board, onDelete }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/boards/${board.id}`);
  };

  console.log(board)
  return (
    <div className="board-card">
      <img src={board.image} alt={board.title} className="board-card-image" />
      <div className="board-card-content">
        <h3>{board.title}</h3>
        <p>{board.description}</p>
        <p><strong>Category:</strong> {board.category}</p>
        {board.author && <p><strong>Author:</strong> {board.author}</p>}
        <div className="card-buttons">
          <button className="view-button" onClick={handleViewClick}>View</button>
          <button className="delete-button" onClick={() => onDelete(board.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
