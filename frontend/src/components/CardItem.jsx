import React from 'react';
import './CardItem.css';

const CardItem = ({ card, onDelete, onUpvote }) => {
  return (
    <div className="card-item">
      <img src={card.gif} alt="card gif" className="card-gif" />
      <div className="card-content">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        {card.author && <p className="author">— {card.author}</p>}
        <div className="card-actions">
          <button onClick={() => onUpvote(card.id)}>👍 {card.upvotes}</button>
          <button onClick={() => onDelete(card.id)}>🗑 Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
