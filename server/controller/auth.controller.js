import user_model from '../models/user_model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await user_model.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await user_model.create({ name, email, password: hashed });

  generateToken(res, user._id);
  res.status(201).json({ user: { name, email } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await user_model.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  generateToken(res, user._id);
  res.status(200).json({ user: { name: user.name, email: user.email } });
};

export const getMe = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await user_model.findById(decoded.userId).select('-password');
  res.status(200).json({ user });
};

export const logout = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out' });
};
