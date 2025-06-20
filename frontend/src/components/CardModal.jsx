import React from 'react';
import './CardModal.css';

const CardModal = ({ show, onClose, onChange, onSubmit, cardData }) => {
  if (!show) return null; // ⬅️ This line prevents the modal from rendering if `show` is false

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Add a Card</h2>
        <form onSubmit={onSubmit} className="card-form">
          <input name="title" value={cardData.title} onChange={onChange} placeholder="Card Title" required />
          <input name="description" value={cardData.description} onChange={onChange} placeholder="Description" required />
          <input name="gif" value={cardData.gif} onChange={onChange} placeholder="GIF URL" required />
          <input name="author" value={cardData.author} onChange={onChange} placeholder="Author (optional)" />
          <button type="submit">Add Card</button>
        </form>
      </div>
    </div>
  );
};

export default CardModal;
