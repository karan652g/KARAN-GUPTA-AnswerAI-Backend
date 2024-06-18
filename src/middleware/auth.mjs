// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import { tokenBlacklist } from '../utils/tokenBlacklist.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token has been logged out' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
