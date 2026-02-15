import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.js';
import * as resumeController from '../controllers/resumeController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allow PDF and common document formats
    const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

// All routes require authentication
router.use(authenticate);

// Upload resume
router.post('/', upload.single('resume'), resumeController.uploadResume);

// Get all resumes
router.get('/', resumeController.getResumes);

// Download resume
router.get('/:id/download', resumeController.downloadResume);

// Set primary resume
router.put('/:id/primary', resumeController.setPrimaryResume);

// Delete resume
router.delete('/:id', resumeController.deleteResume);

export default router;
