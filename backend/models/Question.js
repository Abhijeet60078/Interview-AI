import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  company: {
    type: [String],
    default: []
  },
  topic: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['dsa', 'frontend', 'systemdesign', 'cpp', 'oop', 'dbms', 'os', 'quant', 'verbal', 'fullstack', 'behavioral'],
    required: true
  },
  acceptance: {
    type: Number,
    default: null
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  leetcodeSlug: {
    type: String,
    default: null
  },
  solution: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
