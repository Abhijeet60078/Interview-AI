import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/ai/feedback/interview
 * @desc    Generate AI feedback for interview answer
 * @access  Public (can be protected with authenticate if needed)
 */
router.post('/feedback/interview', aiController.generateInterviewFeedback);

/**
 * @route   POST /api/ai/feedback/code
 * @desc    Analyze code and provide feedback
 * @access  Public
 */
router.post('/feedback/code', aiController.analyzeCode);

/**
 * @route   POST /api/ai/questions/generate
 * @desc    Generate interview questions based on topic
 * @access  Public
 */
router.post('/questions/generate', aiController.generateQuestions);

/**
 * @route   POST /api/ai/mock-interview
 * @desc    Generate complete mock interview
 * @access  Public
 */
router.post('/mock-interview', aiController.generateMockInterview);

/**
 * @route   POST /api/ai/resume/analyze
 * @desc    Analyze resume and provide feedback
 * @access  Private (requires authentication)
 */
router.post('/resume/analyze', authenticate, aiController.analyzeResume);

export default router;
