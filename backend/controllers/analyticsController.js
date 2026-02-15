import UserProgress from '../models/UserProgress.js';
import Question from '../models/Question.js';
import MockInterview from '../models/MockInterview.js';

export const getOverallStats = async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.userId });

    const stats = {
      totalAttempted: progress.length,
      totalSolved: progress.filter(p => p.status === 'solved').length,
      totalSkipped: progress.filter(p => p.status === 'skipped').length,
      avgAccuracy: progress.length > 0 
        ? (progress.reduce((sum, p) => sum + (p.accuracy || 0), 0) / progress.length).toFixed(2)
        : 0,
      totalTimeSpentt: progress.reduce((sum, p) => sum + (p.timeTaken || 0), 0),
      successRate: progress.length > 0
        ? ((progress.filter(p => p.status === 'solved').length / progress.length) * 100).toFixed(2)
        : 0
    };

    res.status(200).json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopicStats = async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.userId }).populate('questionId');

    const topicStats = {};

    progress.forEach(p => {
      const topic = p.questionId.topic;
      if (!topicStats[topic]) {
        topicStats[topic] = {
          total: 0,
          solved: 0,
          attempted: 0,
          accuracy: []
        };
      }
      topicStats[topic].total += 1;
      if (p.status === 'solved') topicStats[topic].solved += 1;
      topicStats[topic].attempted += 1;
      if (p.accuracy) topicStats[topic].accuracy.push(p.accuracy);
    });

    const formattedStats = Object.entries(topicStats).map(([topic, data]) => ({
      topic,
      ...data,
      avgAccuracy: data.accuracy.length > 0
        ? (data.accuracy.reduce((a, b) => a + b) / data.accuracy.length).toFixed(2)
        : 0,
      successRate: data.total > 0 
        ? ((data.solved / data.total) * 100).toFixed(2)
        : 0
    }));

    res.status(200).json({ topicStats: formattedStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDifficultyStats = async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.userId }).populate('questionId');

    const difficultyStats = {
      easy: { total: 0, solved: 0, accuracy: [] },
      medium: { total: 0, solved: 0, accuracy: [] },
      hard: { total: 0, solved: 0, accuracy: [] }
    };

    progress.forEach(p => {
      const difficulty = p.questionId.difficulty;
      difficultyStats[difficulty].total += 1;
      if (p.status === 'solved') difficultyStats[difficulty].solved += 1;
      if (p.accuracy) difficultyStats[difficulty].accuracy.push(p.accuracy);
    });

    const formattedStats = Object.entries(difficultyStats).map(([difficulty, data]) => ({
      difficulty,
      total: data.total,
      solved: data.solved,
      successRate: data.total > 0 
        ? ((data.solved / data.total) * 100).toFixed(2)
        : 0,
      avgAccuracy: data.accuracy.length > 0
        ? (data.accuracy.reduce((a, b) => a + b) / data.accuracy.length).toFixed(2)
        : 0
    }));

    res.status(200).json({ difficultyStats: formattedStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStrengthsAndWeaknesses = async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.userId }).populate('questionId');

    const topicStats = {};

    progress.forEach(p => {
      const topic = p.questionId.topic;
      if (!topicStats[topic]) {
        topicStats[topic] = {
          solved: 0,
          total: 0
        };
      }
      topicStats[topic].total += 1;
      if (p.status === 'solved') topicStats[topic].solved += 1;
    });

    const strengths = Object.entries(topicStats)
      .map(([topic, data]) => ({
        topic,
        successRate: ((data.solved / data.total) * 100).toFixed(2)
      }))
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5);

    const weaknesses = Object.entries(topicStats)
      .map(([topic, data]) => ({
        topic,
        successRate: ((data.solved / data.total) * 100).toFixed(2)
      }))
      .sort((a, b) => a.successRate - b.successRate)
      .slice(0, 5);

    res.status(200).json({ strengths, weaknesses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMockInterviewStats = async (req, res) => {
  try {
    const interviews = await MockInterview.find({ userId: req.userId });

    const stats = {
      totalInterviews: interviews.length,
      completed: interviews.filter(i => i.status === 'completed').length,
      avgScore: interviews.length > 0
        ? (interviews.reduce((sum, i) => sum + i.score, 0) / interviews.length).toFixed(2)
        : 0,
      recentInterviews: interviews.sort({ completedAt: -1 }).slice(0, 5)
    };

    res.status(200).json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
