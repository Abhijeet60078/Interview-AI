import api from './axiosInstance';

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

export const questionAPI = {
  getAllQuestions: (params) => api.get('/questions', { params }),
  getQuestionById: (id) => api.get(`/questions/${id}`),
  getQuestionsByCategory: (category) => api.get(`/questions/category/${category}`),
  searchQuestions: (query) => api.get('/questions/search', { params: { query } }),
  createQuestion: (data) => api.post('/questions', data),
  deleteQuestion: (id) => api.delete(`/questions/${id}`),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  saveQuestion: (questionId) => api.post('/users/bookmark', { questionId }),
  unsaveQuestion: (questionId) => api.delete('/users/bookmark', { data: { questionId } }),
  getSavedQuestions: () => api.get('/users/bookmarked'),
  changePassword: (data) => api.post('/users/change-password', data),
};

export const progressAPI = {
  trackProgress: (data) => api.post('/progress/track', data),
  getUserProgress: () => api.get('/progress'),
  getSolvedQuestions: () => api.get('/progress/solved'),
  getAttemptedQuestions: () => api.get('/progress/attempted'),
  getProgressByCategory: (category) => api.get(`/progress/category/${category}`),
  clearProgress: () => api.delete('/progress/clear'),
};

export const analyticsAPI = {
  getOverallStats: () => api.get('/analytics/overview'),
  getTopicStats: () => api.get('/analytics/topics'),
  getDifficultyStats: () => api.get('/analytics/difficulty'),
  getStrengthsAndWeaknesses: () => api.get('/analytics/insights'),
  getMockInterviewStats: () => api.get('/analytics/interviews'),
};

export const resumeAPI = {
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post('/resumes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getResumes: () => api.get('/resumes'),
  downloadResume: (id) => api.get(`/resumes/${id}/download`),
  setPrimaryResume: (id) => api.put(`/resumes/${id}/primary`),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
};

export const forumAPI = {
  getThreads: (params) => api.get('/forum', { params }),
  getThreadById: (id) => api.get(`/forum/${id}`),
  createThread: (data) => api.post('/forum', data),
  addReply: (id, data) => api.post(`/forum/${id}/reply`, data),
  likeThread: (id) => api.put(`/forum/${id}/like`),
  deleteThread: (id) => api.delete(`/forum/${id}`),
};

export const interviewScheduleAPI = {
  scheduleInterview: (data) => api.post('/interviews', data),
  getMyInterviews: () => api.get('/interviews'),
  getInterviewById: (id) => api.get(`/interviews/${id}`),
  updateInterviewStatus: (id, status) => api.put(`/interviews/${id}/status`, { status }),
  rescheduleInterview: (id, scheduledDate) => api.put(`/interviews/${id}/reschedule`, { scheduledDate }),
  addFeedback: (id, feedback, rating) => api.put(`/interviews/${id}/feedback`, { feedback, rating }),
  cancelInterview: (id) => api.put(`/interviews/${id}/cancel`),
  getAvailableInterviewers: () => api.get('/interviews/interviewers'),
};

export const aiAPI = {
  // Generate AI feedback for interview answers
  generateInterviewFeedback: (question, answer, category, description, difficulty) => 
    api.post('/ai/feedback/interview', { question, answer, category, description, difficulty }),
  
  // Analyze code and get feedback
  analyzeCode: (code, language, problemStatement) => 
    api.post('/ai/feedback/code', { code, language, problemStatement }),
  
  // Generate interview questions on a topic
  generateQuestions: (topic, difficulty, count) => 
    api.post('/ai/questions/generate', { topic, difficulty, count }),
  
  // Generate complete mock interview
  generateMockInterview: (category, duration, difficulty) => 
    api.post('/ai/mock-interview', { category, duration, difficulty }),
  
  // Analyze resume
  analyzeResume: (resumeText, targetRole) => 
    api.post('/ai/resume/analyze', { resumeText, targetRole }),
};

