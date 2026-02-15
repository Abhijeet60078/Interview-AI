import mongoose from 'mongoose';

const mockInterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  category: {
    type: String,
    enum: ['dsa', 'frontend', 'systemdesign', 'behavioral', 'technical'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  questions: {
    type: [{
      questionId: mongoose.Schema.Types.ObjectId,
      asked: Boolean,
      answered: Boolean,
      feedback: String,
      score: Number
    }],
    default: []
  },
  score: {
    type: Number,
    default: 0
  },
  feedback: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'abandoned'],
    default: 'ongoing'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
});

const MockInterview = mongoose.model('MockInterview', mockInterviewSchema);
export default MockInterview;
