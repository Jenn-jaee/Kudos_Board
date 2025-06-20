import React, { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import CardItem from '../components/CardItem';
import CardModal from '../components/CardModal';

import './BoardPage.css';

function BoardPage() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', description: '', gif: '', author: '' });
  const navigate = useNavigate();



  useEffect(() => {
    fetch(`http://localhost:5000/api/boards/${boardId}`)
      .then(res => res.json())
      .then(data => {
        setBoard(data);
        setCards(data.cards || []);
      });
  }, [boardId]);


  //for cards
  const handleUpvote = async (cardId) => {
  const res = await fetch(`http://localhost:5000/api/cards/${cardId}/upvote`, {
    method: 'PATCH',
  });

  if (res.ok) {
    const updatedCard = await res.json();
    setCards(prev => prev.map(card => card.id === cardId ? updatedCard : card));
  }
  };

  const handleDelete = async (cardId) => {
    const res = await fetch(`http://localhost:5000/api/cards/${cardId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setCards(prev => prev.filter(card => card.id !== cardId));
    }
  };


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
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back
      </button>
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
        {cards.map(card => (
          <CardItem
            key={card.id}
            card={card}
            onUpvote={handleUpvote}
            onDelete={handleDelete}
          />
      ))}
</div>

    </div>
  );
}

export default BoardPage;
