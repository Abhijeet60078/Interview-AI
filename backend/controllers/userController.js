import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstname, lastname, bio, profileImage, targetCompanies, targetRole, experienceLevel, preferredTopics } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        firstname,
        lastname,
        bio,
        profileImage,
        targetCompanies,
        targetRole,
        experienceLevel,
        preferredTopics,
        updatedAt: Date.now()
      },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const saveQuestion = async (req, res) => {
  try {
    const { questionId } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.savedQuestions.includes(questionId)) {
      user.savedQuestions.push(questionId);
      await user.save();
    }

    res.status(200).json({
      message: 'Question saved successfully',
      savedQuestions: user.savedQuestions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unsaveQuestion = async (req, res) => {
  try {
    const { questionId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { savedQuestions: questionId } },
      { new: true }
    );

    res.status(200).json({
      message: 'Question removed from saved',
      savedQuestions: user.savedQuestions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSavedQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('savedQuestions');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      count: user.savedQuestions.length,
      savedQuestions: user.savedQuestions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    const user = await User.findById(req.userId);
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
