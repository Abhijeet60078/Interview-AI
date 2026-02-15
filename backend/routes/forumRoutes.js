import express from 'express';
import { authenticate } from '../middleware/auth.js';
import * as forumController from '../controllers/forumController.js';

const router = express.Router();

// Public routes
router.get('/', forumController.getThreads);
router.get('/:id', forumController.getThreadById);

// Protected routes
router.post('/', authenticate, forumController.createThread);
router.post('/:id/reply', authenticate, forumController.addReply);
router.put('/:id/like', authenticate, forumController.likeThread);
router.delete('/:id', authenticate, forumController.deleteThread);

export default router;
