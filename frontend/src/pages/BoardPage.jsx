import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardItem from '../components/CardItem';
import './BoardPage.css'; // for styling

function BoardPage() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ title: '', description: '', gif: '', author: '' });

  // Fetch board and card details
  useEffect(() => {
    fetch(`http://localhost:5000/api/boards/${boardId}`)
      .then(res => res.json())
      .then(data => {
        setBoard(data);
        setCards(data.cards || []);
      });
  }, [boardId]);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };



  // modified Submit new card

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardData = { ...newCard, boardId }; // Include boardId in the body

    const res = await fetch(`http://localhost:5000/api/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardData),
    });

    const data = await res.json();
    if (res.ok) {
      setCards(prev => [data, ...prev]);
      setNewCard({ title: '', description: '', gif: '', author: '' });
    }
};


  if (!board) return <p>Loading...</p>;

  return (
    <div className="board-page">
      <h2>{board.title}</h2>
      <p><strong>Category:</strong> {board.category}</p>
      <p><strong>Author:</strong> {board.author}</p>
      <p>{board.description}</p>

      <form className="card-form" onSubmit={handleSubmit}>
        <h3>Add a Card</h3>
        <input name="title" value={newCard.title} onChange={handleInputChange} placeholder="Card Title" required />
        <input name="description" value={newCard.description} onChange={handleInputChange} placeholder="Description" required />
        <input name="gif" value={newCard.gif} onChange={handleInputChange} placeholder="GIF URL" required />
        <input name="author" value={newCard.author} onChange={handleInputChange} placeholder="Author (optional)" />
        <button type="submit">Add Card</button>
      </form>

      <div className="card-grid">
        {cards.map(card => <CardItem key={card.id} card={card} />)}
      </div>
    </div>
  );
}

export default BoardPage;
