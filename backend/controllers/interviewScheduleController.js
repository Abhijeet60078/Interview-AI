import InterviewSchedule from '../models/InterviewSchedule.js';
import User from '../models/User.js';

export const scheduleInterview = async (req, res) => {
  try {
    const { interviewerId, interviewType, difficulty, scheduledDate, duration, interviewerLevel } = req.body;

    if (!interviewerId || !scheduledDate) {
      return res.status(400).json({ message: 'InterviewerId and scheduledDate are required' });
    }

    // Check if interviewer exists
    const interviewer = await User.findById(interviewerId);
    if (!interviewer) {
      return res.status(404).json({ message: 'Interviewer not found' });
    }

    const interview = new InterviewSchedule({
      interviewerId,
      intervieweeId: req.user.id,
      interviewType,
      difficulty,
      scheduledDate,
      duration: duration || 45,
      status: 'pending',
      interviewerLevel,
      virtualRoomId: `room_${Date.now()}`
    });

    await interview.save();

    // Populate user details
    await interview.populate(['interviewerId', 'intervieweeId']);

    res.status(201).json({
      message: 'Interview scheduled successfully',
      interview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await InterviewSchedule.find({
      $or: [
        { interviewerId: req.user.id },
        { intervieweeId: req.user.id }
      ]
    })
      .populate('interviewerId', 'name email')
      .populate('intervieweeId', 'name email')
      .sort({ scheduledDate: -1 });

    res.status(200).json({
      count: interviews.length,
      interviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await InterviewSchedule.findById(req.params.id)
      .populate('interviewerId', 'name email')
      .populate('intervieweeId', 'name email');

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json({ interview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInterviewStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'scheduled', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const interview = await InterviewSchedule.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate(['interviewerId', 'intervieweeId']);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json({
      message: 'Interview status updated',
      interview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rescheduleInterview = async (req, res) => {
  try {
    const { scheduledDate } = req.body;

    if (!scheduledDate) {
      return res.status(400).json({ message: 'New scheduled date is required' });
    }

    const interview = await InterviewSchedule.findByIdAndUpdate(
      req.params.id,
      { scheduledDate, updatedAt: Date.now() },
      { new: true }
    ).populate(['interviewerId', 'intervieweeId']);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json({
      message: 'Interview rescheduled successfully',
      interview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFeedback = async (req, res) => {
  try {
    const { feedback, rating } = req.body;

    const interview = await InterviewSchedule.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    if (interview.interviewerId.toString() === req.user.id) {
      interview.feedbackByInterviewer = feedback;
    }

    if (interview.intervieweeId.toString() === req.user.id && rating) {
      interview.ratingByInterviewee = rating;
    }

    await interview.save();

    res.status(200).json({
      message: 'Feedback added successfully',
      interview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelInterview = async (req, res) => {
  try {
    const interview = await InterviewSchedule.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', updatedAt: Date.now() },
      { new: true }
    ).populate(['interviewerId', 'intervieweeId']);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json({
      message: 'Interview cancelled',
      interview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available interviewers
export const getAvailableInterviewers = async (req, res) => {
  try {
    const interviewers = await User.find({ role: 'interviewer' })
      .select('name email _id')
      .limit(20);

    res.status(200).json({
      count: interviewers.length,
      interviewers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
