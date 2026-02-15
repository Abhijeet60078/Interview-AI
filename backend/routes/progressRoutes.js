import express from 'express';
import {
  trackProgress,
  getUserProgress,
  getSolvedQuestions,
  getAttemptedQuestions,
  getProgressByCategory,
  clearProgress
} from '../controllers/progressController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/track', trackProgress);
router.get('/', getUserProgress);
router.get('/solved', getSolvedQuestions);
router.get('/attempted', getAttemptedQuestions);
router.get('/category/:category', getProgressByCategory);
router.delete('/clear', clearProgress);

export default router;
