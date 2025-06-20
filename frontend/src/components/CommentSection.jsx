import React, { useState, useEffect } from 'react';
import './CommentSection.css';

function CommentSection({ cardId, isOpen, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ message: '', author: '' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch comments when component opens
  useEffect(() => {
    if (isOpen && cardId) {
      fetchComments();
    }
  }, []);

  const fetchComments = async () => {
    if (!cardId) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:5000/api/cards/${cardId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        setError('Failed to load comments');
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.message.trim()) {
      setError('Please enter a message');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const commentData = {
        message: newComment.message.trim(),
        cardId: parseInt(cardId)
      };

      // Only include author if provided
      if (newComment.author.trim()) {
        commentData.author = newComment.author.trim();
      }

      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const createdComment = await response.json();
        setComments(prev => [createdComment, ...prev]); // Add to top
        setNewComment({ message: '', author: '' }); // Clear form
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add comment');
      }
    } catch (err) {
      console.error('Error creating comment:', err);
      setError('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="comment-section-overlay" onClick={onClose}>
      <div className="comment-section" onClick={e => e.stopPropagation()}>
        <div className="comment-header">
          <h3>Comments ({comments.length})</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-group">
            <textarea
              name="message"
              value={newComment.message}
              onChange={handleInputChange}
              placeholder="Write a comment..."
              rows="3"
              disabled={submitting}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="author"
              value={newComment.author}
              onChange={handleInputChange}
              placeholder="Your name (optional)"
              disabled={submitting}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="submit-btn"
            disabled={submitting || !newComment.message.trim()}
          >
            {submitting ? 'Adding...' : 'Add Comment'}
          </button>
        </form>

        {/* Comments List */}
        <div className="comments-list">
          {loading ? (
            <div className="loading">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="no-comments">No comments yet. Be the first to comment!</div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header-item">
                  <span className="comment-author">
                    {comment.author || 'Anonymous'}
                  </span>
                  <span className="comment-date">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <div className="comment-message">
                  {comment.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentSection;