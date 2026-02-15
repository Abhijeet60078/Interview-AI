import mongoose from 'mongoose';

const interviewScheduleSchema = new mongoose.Schema({
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  intervieweeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  interviewType: {
    type: String,
    enum: ['DSA', 'System Design', 'Behavioral', 'Full Round'],
    default: 'DSA'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    default: 45 // in minutes
  },
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'completed', 'cancelled'],
    default: 'pending'
  },
  interviewerLevel: {
    type: String,
    enum: ['Junior', 'Mid', 'Senior'],
    default: 'Mid'
  },
  virtualRoomId: {
    type: String,
    default: null
  },
  feedbackByInterviewer: {
    type: String,
    default: null
  },
  ratingByInterviewee: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('InterviewSchedule', interviewScheduleSchema);
