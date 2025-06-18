// // ✅ boardController.js
// const { PrismaClient } = require('../generated/prisma');
// const prisma = new PrismaClient();

// // CREATE board
// const createBoard = async (req, res) => {
//   console.log('🟢 createBoard controller triggered');
//   const { title, description, category, image, author } = req.body;

//   try {
//     const newBoard = await prisma.board.create({
//       data: { title, description, category, image, author }
//     });
//     res.status(201).json(newBoard);
//   } catch (error) {
//     console.error('❌ Error creating board:', error);
//     res.status(500).json({ error: 'Failed to create board' });
//   }
// };

// // GET all boards
// const getAllBoards = async (req, res) => {
//   console.log('📦 Fetching all boards...');
//   try {
//     const boards = await prisma.board.findMany({
//       include: { cards: true },
//     });
//     res.json(boards);
//   } catch (error) {
//     console.error('❌ Error fetching boards:', error);
//     res.status(500).json({ error: 'Failed to fetch boards' });
//   }
// };

// // Optional future methods:
// const getBoardById = async (req, res) => {
//   const boardId = parseInt(req.params.boardId);
//   try {
//     const board = await prisma.board.findUnique({
//       where: { id: boardId },
//       include: { cards: true },
//     });

//     if (!board) return res.status(404).json({ error: 'Board not found' });
//     res.json(board);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch board' });
//   }
// };

// const deleteBoard = async (req, res) => {
//   const boardId = parseInt(req.params.boardId);
//   try {
//     await prisma.board.delete({ where: { id: boardId } });
//     res.json({ message: 'Board deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete board' });
//   }
// };

// module.exports = {
//   createBoard,
//   getAllBoards,
//   getBoardById,
//   deleteBoard
// };