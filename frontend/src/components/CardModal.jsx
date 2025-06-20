import React, { useState, useEffect } from 'react';
import './CardModal.css';

const GIPHY_API_KEY = 'rtaPzRneJcnGXAPZnafInPz0ZgFkofyo';

const CardModal = ({ show, onClose, onChange, onSubmit, cardData }) => {
  const [gifSearch, setGifSearch] = useState('');
  const [gifResults, setGifResults] = useState([]);

  // ✅ Always declare hooks before conditional returns
  useEffect(() => {
    if (!gifSearch) return;
    
    const timer = setTimeout(() => {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifSearch}&limit=6`)
        .then(res => res.json())
        .then(data => setGifResults(data.data))
        .catch(err => console.error('Error fetching GIFs:', err));
    }, 500);

    return () => clearTimeout(timer); // Cleanup debounce
  }, [gifSearch]);

  const handleGifSelect = (gifUrl) => {
    onChange({ target: { name: 'gif', value: gifUrl } });
    setGifSearch('');
    setGifResults([]);
  };

  // ✅ Safe to return early AFTER all hooks
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Add a Card</h2>
        <form onSubmit={onSubmit} className="card-form">
          <input name="title" value={cardData.title} onChange={onChange} placeholder="Card Title" required />
          <input name="description" value={cardData.description} onChange={onChange} placeholder="Description" required />
          <input name="gif" value={cardData.gif} onChange={onChange} placeholder="GIF URL" required />

          <input
            type="text"
            placeholder="Search for a GIF..."
            value={gifSearch}
            onChange={(e) => setGifSearch(e.target.value)}
          />

          <div className="gif-results">
            {gifResults.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height_small.url}
                alt="GIF option"
                className="gif-thumbnail"
                onClick={() => handleGifSelect(gif.images.original.url)}
              />
            ))}
          </div>

          <input name="author" value={cardData.author} onChange={onChange} placeholder="Author (optional)" />
          <button type="submit">Add Card</button>
        </form>
      </div>
    </div>
  );
};

export default CardModal;
