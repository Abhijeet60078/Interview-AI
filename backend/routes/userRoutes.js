import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  saveQuestion,
  unsaveQuestion,
  getSavedQuestions,
  changePassword
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/bookmark', saveQuestion);
router.delete('/bookmark', unsaveQuestion);
router.get('/bookmarked', getSavedQuestions);
router.post('/change-password', changePassword);

export default router;
