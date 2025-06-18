import React from 'react';
import { useParams } from 'react-router-dom';

function BoardPage() {
  const { boardId } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Board Details - ID: {boardId}</h2>
      <p>Cards will be displayed here!</p>
    </div>
  );
}

export default BoardPage;