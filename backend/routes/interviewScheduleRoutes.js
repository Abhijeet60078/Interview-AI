import express from 'express';
import { authenticate } from '../middleware/auth.js';
import * as interviewScheduleController from '../controllers/interviewScheduleController.js';

const router = express.Router();

// Public routes
router.get('/interviewers', interviewScheduleController.getAvailableInterviewers);

// Protected routes
router.post('/', authenticate, interviewScheduleController.scheduleInterview);
router.get('/', authenticate, interviewScheduleController.getMyInterviews);
router.get('/:id', authenticate, interviewScheduleController.getInterviewById);
router.put('/:id/status', authenticate, interviewScheduleController.updateInterviewStatus);
router.put('/:id/reschedule', authenticate, interviewScheduleController.rescheduleInterview);
router.put('/:id/feedback', authenticate, interviewScheduleController.addFeedback);
router.put('/:id/cancel', authenticate, interviewScheduleController.cancelInterview);

export default router;
