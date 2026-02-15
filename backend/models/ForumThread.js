import mongoose from 'mongoose';

const forumThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Arrays', 'Strings', 'Algorithms', 'System Design', 'Database', 'Networking', 'General'],
    default: 'General'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  replies: [{
    _id: mongoose.Schema.Types.ObjectId,
    authorId: mongoose.Schema.Types.ObjectId,
    authorName: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    likes: {
      type: Number,
      default: 0
    }
  }],
  tags: [String],
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
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

export default mongoose.model('ForumThread', forumThreadSchema);
