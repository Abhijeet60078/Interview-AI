import Resume from '../models/Resume.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resume = new Resume({
      userId: req.user.id,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      fileData: req.file.buffer,
      isPrimary: false
    });

    await resume.save();
    res.status(201).json({
      message: 'Resume uploaded successfully',
      resume: {
        id: resume._id,
        fileName: resume.fileName,
        fileSize: resume.fileSize,
        uploadedAt: resume.uploadedAt,
        isPrimary: resume.isPrimary
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .select('-fileData')
      .sort({ uploadedAt: -1 });

    res.status(200).json({
      count: resumes.length,
      resumes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.setHeader('Content-Type', resume.fileType);
    res.setHeader('Content-Disposition', `attachment; filename="${resume.fileName}"`);
    res.send(resume.fileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setPrimaryResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Remove primary from all other resumes
    await Resume.updateMany(
      { userId: req.user.id },
      { isPrimary: false }
    );

    // Set this one as primary
    resume.isPrimary = true;
    await resume.save();

    res.status(200).json({
      message: 'Primary resume set successfully',
      resume: {
        id: resume._id,
        fileName: resume.fileName,
        isPrimary: resume.isPrimary
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
