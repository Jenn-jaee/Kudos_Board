import React from 'react';
import './CardItem.css';

const CardItem = ({ card, onDelete, onUpvote }) => {
  return (
    <div className="card-item">
      <img src={card.gif} alt={card.title} className="card-gif" />

      <div className="card-content">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        {card.author && <p className="card-author">— {card.author}</p>}

        <div className="card-actions">
          <button className="upvote-button" onClick={() => onUpvote(card.id)}>
            ⬆️ {card.upvotes || 0}
          </button>
          <button className="delete-button" onClick={() => onDelete(card.id)}>
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
