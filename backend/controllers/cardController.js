// const { PrismaClient } = require('../generated/prisma');
// const prisma = new PrismaClient();

// // CREATE a card
// const createCard = async (req, res) => {
//   const boardId = parseInt(req.params.boardId);
//   const { title, description, gif, author } = req.body;

//   if (!title || !description || !gif) {
//     return res.status(400).json({ error: 'Title, description, and gif are required' });
//   }

//   try {
//     const newCard = await prisma.card.create({
//       data: {
//         title,
//         description,
//         gif,
//         author,
//         board: {
//           connect: { id: boardId }
//         }
//       }
//     });
//     res.status(201).json(newCard);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create card' });
//   }
// };

// // GET cards by board ID
// const getCardsByBoardId = async (req, res) => {
//   const boardId = parseInt(req.params.boardId);
//   try {
//     const cards = await prisma.card.findMany({
//       where: { boardId },
//       orderBy: { createdAt: 'desc' }
//     });
//     res.json(cards);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve cards' });
//   }
// };

// // DELETE card
// const deleteCard = async (req, res) => {
//   const cardId = parseInt(req.params.cardId);
//   try {
//     await prisma.card.delete({ where: { id: cardId } });
//     res.json({ message: 'Card deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete card' });
//   }
// };

// // UPVOTE card
// const upvoteCard = async (req, res) => {
//   const cardId = parseInt(req.params.cardId);
//   try {
//     const updatedCard = await prisma.card.update({
//       where: { id: cardId },
//       data: {
//         upvotes: {
//           increment: 1
//         }
//       }
//     });
//     res.json(updatedCard);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to upvote card' });
//   }
// };

// module.exports = {
//   createCard,
//   getCardsByBoardId,
//   deleteCard,
//   upvoteCard
// };
