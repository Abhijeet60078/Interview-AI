export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateUserInput = (firstname, lastname, email, password) => {
  const errors = [];

  if (!firstname || firstname.trim().length === 0) {
    errors.push('First name is required');
  }

  if (!lastname || lastname.trim().length === 0) {
    errors.push('Last name is required');
  }

  if (!validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!validatePassword(password)) {
    errors.push('Password must be at least 6 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const calculateSuccessRate = (solved, total) => {
  if (total === 0) return 0;
  return ((solved / total) * 100).toFixed(2);
};

export const calculateAverageAccuracy = (accuracyArray) => {
  if (accuracyArray.length === 0) return 0;
  const sum = accuracyArray.reduce((a, b) => a + b, 0);
  return (sum / accuracyArray.length).toFixed(2);
};

export const getTimeFormatted = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
};
