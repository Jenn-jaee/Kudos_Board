require('dotenv').config();
console.log('index.js loaded and running');

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Validation middleware
const validateBoard = (req, res, next) => {
  const { title, description, category, author } = req.body;
  
  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description, and category are required.' });
  }

  
  if (title.length < 1 || title.length > 100) {
    return res.status(400).json({ 
      error: 'Title must be between 1 and 100 characters' 
    });
  }
  
  next();
};

const validateCard = (req, res, next) => {
  const { title, description, author, boardId } = req.body;
  
  if (!title || !description || !boardId) {
    return res.status(400).json({ 
      error: 'Missing required fields: title, description, and boardId are required' 
    });
  }
  
  if (!Number.isInteger(Number(boardId))) {
    return res.status(400).json({ 
      error: 'boardId must be a valid integer' 
    });
  }
  
  next();
};

// Root route
app.get('/', (req, res) => {
  res.send('🌟 API is running live... 🌟');
});

// ===== BOARD ROUTES =====

// ✅ CREATE Board
app.post('/api/boards', validateBoard, async (req, res) => {
  let { title, description, category, image, author } = req.body;

  if (!image || image.trim() === '') {
    image = `https://loremflickr.com/500/300/${category}`;  }
  
  try {
    const newBoard = await prisma.board.create({
      data: { 
        title, 
        description, 
        category, 
        image: image?.trim() || '',
        author 
      },
    });
    res.status(201).json(newBoard);
  } catch (error) {
    console.error('❌ Error creating board:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// ✅ GET all boards
app.get('/api/boards', async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: { 
        cards: {
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(boards);
  } catch (error) {
    console.error('❌ Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// ✅ GET single board
app.get('/api/boards/:id', async (req, res) => {
  const boardId = parseInt(req.params.id);
  
  if (isNaN(boardId)) {
    return res.status(400).json({ error: 'Invalid board ID' });
  }
  
  try {
    const board = await prisma.board.findUnique({
      where: { id: boardId },
      include: { 
        cards: {
          orderBy: { createdAt: 'desc' }
        }
      },
    });
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    
    res.json(board);
  } catch (error) {
    console.error('❌ Error fetching board:', error);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
});

// ✅ UPDATE Board
app.put('/api/boards/:id', async (req, res) => {
  const boardId = parseInt(req.params.id);
  const { title, description, category, image, author } = req.body;
  
  if (isNaN(boardId)) {
    return res.status(400).json({ error: 'Invalid board ID' });
  }
  
  try {
    const updatedBoard = await prisma.board.update({
      where: { id: boardId },
      data: { 
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(image !== undefined && { image }),
        ...(author && { author })
      },
    });
    res.json(updatedBoard);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Board not found' });
    }
    console.error('❌ Error updating board:', error);
    res.status(500).json({ error: 'Failed to update board' });
  }
});

// ✅ DELETE board
app.delete('/api/boards/:id', async (req, res) => {
  const boardId = parseInt(req.params.id);
  
  if (isNaN(boardId)) {
    return res.status(400).json({ error: 'Invalid board ID' });
  }
  
  try {
    await prisma.board.delete({ 
      where: { id: boardId } 
    });
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Board not found' });
    }
    console.error('❌ Error deleting board:', error);
    res.status(500).json({ error: 'Failed to delete board' });
  }
});

// ===== CARD ROUTES =====

// ✅ CREATE Card
app.post('/api/cards', validateCard, async (req, res) => {
  const { title, description, gif, author, boardId } = req.body;
  
  try {
    // Check if board exists
    const board = await prisma.board.findUnique({
      where: { id: parseInt(boardId) }
    });
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    
    const cardData = {
      title,
      description,
      gif: gif || '',
      boardId: parseInt(boardId),
      ...(author && { author })  // ⬅️ Only include author if provided
    };

    const newCard = await prisma.card.create({
      data: cardData,
    });
    
    res.status(201).json(newCard);
  } catch (error) {
    console.error('❌ Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// ✅ GET all cards
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await prisma.card.findMany({
      include: { board: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(cards);
  } catch (error) {
    console.error('❌ Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// ✅ GET single card
app.get('/api/cards/:id', async (req, res) => {
  const cardId = parseInt(req.params.id);
  
  if (isNaN(cardId)) {
    return res.status(400).json({ error: 'Invalid card ID' });
  }
  
  try {
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: { board: true },
    });
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json(card);
  } catch (error) {
    console.error('❌ Error fetching card:', error);
    res.status(500).json({ error: 'Failed to fetch card' });
  }
});

// ✅ GET cards by board
app.get('/api/boards/:boardId/cards', async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  
  if (isNaN(boardId)) {
    return res.status(400).json({ error: 'Invalid board ID' });
  }
  
  try {
    const cards = await prisma.card.findMany({
      where: { boardId: boardId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(cards);
  } catch (error) {
    console.error('❌ Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards for board' });
  }
});

// ✅ UPDATE Card (including upvotes)
app.put('/api/cards/:id', async (req, res) => {
  const cardId = parseInt(req.params.id);
  const { title, description, gif, author, upvotes } = req.body;
  
  if (isNaN(cardId)) {
    return res.status(400).json({ error: 'Invalid card ID' });
  }
  
  try {
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: { 
        ...(title && { title }),
        ...(description && { description }),
        ...(gif !== undefined && { gif }),
        ...(author && { author }),
        ...(upvotes !== undefined && { upvotes: parseInt(upvotes) })
      },
    });
    res.json(updatedCard);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Card not found' });
    }
    console.error('❌ Error updating card:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// ✅ UPVOTE Card (special route for just incrementing upvotes)
app.patch('/api/cards/:id/upvote', async (req, res) => {
  const cardId = parseInt(req.params.id);
  
  if (isNaN(cardId)) {
    return res.status(400).json({ error: 'Invalid card ID' });
  }
  
  try {
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: { 
        upvotes: { increment: 1 }
      },
    });
    res.json(updatedCard);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Card not found' });
    }
    console.error('❌ Error upvoting card:', error);
    res.status(500).json({ error: 'Failed to upvote card' });
  }
});

// ✅ DELETE card
app.delete('/api/cards/:id', async (req, res) => {
  const cardId = parseInt(req.params.id);
  
  if (isNaN(cardId)) {
    return res.status(400).json({ error: 'Invalid card ID' });
  }
  
  try {
    await prisma.card.delete({ 
      where: { id: cardId } 
    });
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Card not found' });
    }
    console.error('❌ Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});