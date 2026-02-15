import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  status: {
    type: String,
    enum: ['attempted', 'solved', 'skipped', 'bookmarked'],
    default: 'attempted'
  },
  attempts: {
    type: Number,
    default: 1
  },
  timeTaken: {
    type: Number, // in seconds
    default: null
  },
  code: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: null
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: null
  },
  accuracy: {
    type: Number, // 0-100
    default: null
  },
  isSaved: {
    type: Boolean,
    default: false
  },
  lastAttempt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
});

// Compound index for userId and questionId
userProgressSchema.index({ userId: 1, questionId: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);
export default UserProgress;
