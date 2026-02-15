import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
};

export const signup = async (req, res) => {
  try {
    let { firstname, lastname, name, email, password, confirmPassword } = req.body;

    // Handle both 'name' (from frontend) and 'firstname/lastname' formats
    if (name && !firstname) {
      const nameParts = name.trim().split(/\s+/);
      firstname = nameParts[0] || '';
      lastname = nameParts.slice(1).join(' ') || nameParts[0] || '';
    }

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword && confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({
      firstname,
      lastname,
      email,
      password
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Signup successful',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
