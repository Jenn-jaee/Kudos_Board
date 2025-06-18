import React, { useState } from 'react';
import './NewBoardForm.css';

function NewBoardForm({ onCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    author: '',
    category: 'Celebration'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      ...formData,
      id: Date.now()
    };
    onCreate(newBoard);
  };

  return (
    <form onSubmit={handleSubmit} className="board-form">
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} required />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <input name="author" placeholder="Author (optional)" onChange={handleChange} />
      <select name="category" onChange={handleChange}>
        <option>Celebration</option>
        <option>Thank You</option>
        <option>Inspiration</option>
      </select>
      <button type="submit">Add Board</button>
    </form>
  );
}

export default NewBoardForm;