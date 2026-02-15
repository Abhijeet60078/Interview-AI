import ForumThread from '../models/ForumThread.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const createThread = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const thread = new ForumThread({
      title,
      description,
      category,
      tags: tags || [],
      author: req.user.id
    });

    await thread.save();
    res.status(201).json({
      message: 'Thread created successfully',
      thread
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getThreads = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const threads = await ForumThread.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      count: threads.length,
      threads
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getThreadById = async (req, res) => {
  try {
    const thread = await ForumThread.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name email');

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    res.status(200).json({ thread });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Reply content is required' });
    }

    const thread = await ForumThread.findById(req.params.id);

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    const reply = {
      _id: new mongoose.Types.ObjectId(),
      authorId: req.user.id,
      authorName: req.user.name,
      content,
      createdAt: new Date(),
      likes: 0
    };

    thread.replies.push(reply);
    await thread.save();

    res.status(201).json({
      message: 'Reply added successfully',
      reply
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeThread = async (req, res) => {
  try {
    const thread = await ForumThread.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    res.status(200).json({
      message: 'Thread liked',
      likes: thread.likes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteThread = async (req, res) => {
  try {
    const thread = await ForumThread.findById(req.params.id);

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    if (thread.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await ForumThread.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Thread deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
