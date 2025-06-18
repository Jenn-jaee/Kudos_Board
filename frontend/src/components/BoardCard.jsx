import React from 'react';
import './BoardCard.css';
import { useNavigate } from 'react-router-dom';

function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="board-card">
      <img src={board.image} alt={board.title} />
      <h3>{board.title}</h3>
      <p>{board.category}</p>
      <small>By {board.author || 'Anonymous'}</small>
      <div className="board-card-buttons">
        <button onClick={() => navigate(`/boards/${board.id}`)}>View</button>
        <button onClick={() => onDelete(board.id)}>Delete</button>
      </div>
    </div>
  );
}

export default BoardCard;