import Question from '../models/Question.js';

export const getAllQuestions = async (req, res) => {
  try {
    const { difficulty, category, topic, company, search } = req.query;
    const filter = {};

    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;
    if (topic) filter.topic = topic;
    if (company) filter.company = { $in: [company] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const questions = await Question.find(filter).sort({ id: 1 });
    res.status(200).json({
      count: questions.length,
      questions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({
      message: 'Question created successfully',
      question
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await Question.find({ category }).sort({ id: 1 });
    res.status(200).json({
      count: questions.length,
      questions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchQuestions = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const questions = await Question.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { topic: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json({
      count: questions.length,
      questions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
