import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardItem from '../components/CardItem';
import CardModal from '../components/CardModal';
import './BoardPage.css';

function BoardPage() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', description: '', gif: '', author: '' });


  useEffect(() => {
    fetch(`http://localhost:5000/api/boards/${boardId}`)
      .then(res => res.json())
      .then(data => {
        setBoard(data);
        setCards(data.cards || []);
      });
  }, [boardId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardData = { ...newCard, boardId };

    const res = await fetch(`http://localhost:5000/api/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardData),
    });

    const data = await res.json();
    if (res.ok) {
      setCards(prev => [data, ...prev]);
      setNewCard({ title: '', description: '', gif: '', author: '' });
      setShowModal(false);
    }
  };

  if (!board) return <p>Loading...</p>;

  return (
    <div className="board-page">
      <h2>{board.title}</h2>
      <p><strong>Category:</strong> {board.category}</p>
      <p><strong>Author:</strong> {board.author}</p>
      <p>{board.description}</p>

      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        Add New Card
      </button>

      <CardModal
        show={showModal}
        onClose={() => setShowModal(false)}
        cardData={newCard}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      <div className="card-grid">
        {cards.map(card => <CardItem key={card.id} card={card} />)}
      </div>
    </div>
  );
}

export default BoardPage;
