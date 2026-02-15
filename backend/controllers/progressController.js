import UserProgress from '../models/UserProgress.js';
import Question from '../models/Question.js';

export const trackProgress = async (req, res) => {
  try {
    const { questionId, status, timeTaken, code, notes, accuracy } = req.body;

    let progress = await UserProgress.findOne({
      userId: req.userId,
      questionId
    });

    if (!progress) {
      progress = new UserProgress({
        userId: req.userId,
        questionId,
        status,
        timeTaken,
        code,
        notes,
        accuracy
      });
    } else {
      progress.status = status || progress.status;
      progress.timeTaken = timeTaken || progress.timeTaken;
      progress.code = code || progress.code;
      progress.notes = notes || progress.notes;
      progress.accuracy = accuracy || progress.accuracy;
      progress.attempts += 1;
      progress.lastAttempt = Date.now();

      if (status === 'solved') {
        progress.completedAt = Date.now();
      }
    }

    await progress.save();

    res.status(200).json({
      message: 'Progress tracked successfully',
      progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.userId })
      .populate('questionId')
      .sort({ lastAttempt: -1 });

    res.status(200).json({
      count: progress.length,
      progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSolvedQuestions = async (req, res) => {
  try {
    const solved = await UserProgress.find({
      userId: req.userId,
      status: 'solved'
    }).populate('questionId');

    res.status(200).json({
      count: solved.length,
      solvedQuestions: solved
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttemptedQuestions = async (req, res) => {
  try {
    const attempted = await UserProgress.find({
      userId: req.userId,
      $or: [{ status: 'attempted' }, { status: 'solved' }]
    }).populate('questionId');

    res.status(200).json({
      count: attempted.length,
      attemptedQuestions: attempted
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgressByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const questions = await Question.find({ category });
    const questionIds = questions.map(q => q._id);

    const progress = await UserProgress.find({
      userId: req.userId,
      questionId: { $in: questionIds }
    });

    const stats = {
      category,
      total: questionIds.length,
      attempted: progress.filter(p => p.status === 'attempted').length,
      solved: progress.filter(p => p.status === 'solved').length,
      skipped: progress.filter(p => p.status === 'skipped').length,
      accuracy: progress.length > 0 
        ? (progress.reduce((sum, p) => sum + (p.accuracy || 0), 0) / progress.length).toFixed(2)
        : 0
    };

    res.status(200).json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearProgress = async (req, res) => {
  try {
    await UserProgress.deleteMany({ userId: req.userId });
    res.status(200).json({ message: 'All progress cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
