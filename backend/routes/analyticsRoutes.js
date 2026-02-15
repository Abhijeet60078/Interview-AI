import express from 'express';
import {
  getOverallStats,
  getTopicStats,
  getDifficultyStats,
  getStrengthsAndWeaknesses,
  getMockInterviewStats
} from '../controllers/analyticsController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/overview', getOverallStats);
router.get('/topics', getTopicStats);
router.get('/difficulty', getDifficultyStats);
router.get('/insights', getStrengthsAndWeaknesses);
router.get('/interviews', getMockInterviewStats);

export default router;
