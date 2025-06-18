import React, { useState } from 'react';
import './NewBoardForm.css';

function NewBoardForm({ onAddBoard }) {
  const [formData, setFormData] = useState({ title: '', description: '', category: '', image: '', author: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.image) return;
    const newBoard = { ...formData, id: Date.now().toString() };
    onAddBoard(newBoard);
    setFormData({ title: '', description: '', category: '', image: '', author: '' });
  };

  return (
    <form className="new-board-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
      <input name="author" placeholder="Author (optional)" value={formData.author} onChange={handleChange} />
      <button type="submit">Add Board</button>
    </form>
  );
}

export default NewBoardForm;
