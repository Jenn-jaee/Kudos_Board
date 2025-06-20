import React from 'react';
import './BoardModal.css';

const BoardModal = ({ formData, handleChange, handleSubmit, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Board</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="celebration">Celebration</option>
            <option value="thank you">Thank You</option>
            <option value="inspiration">Inspiration</option>
          </select>
            <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL (optional)" />
          <input type="text" name="author" placeholder="Author (optional)" value={formData.author} onChange={handleChange} />
          
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Create Board</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardModal;
