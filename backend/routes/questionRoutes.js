import express from 'express';
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByCategory,
  searchQuestions
} from '../controllers/questionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/search', searchQuestions);
router.get('/category/:category', getQuestionsByCategory);
router.get('/:id', getQuestionById);

router.post('/', createQuestion);
router.put('/:id', authenticate, updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
