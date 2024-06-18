// src/controllers/authController.js
import pkg from 'bcryptjs';
const { compareSync } = pkg;
import pkg2 from 'jsonwebtoken';
const { sign, verify} = pkg2;
import { tokenBlacklist } from '../utils/tokenBlacklist.js';
import { findOne } from '../models/user.mjs';

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findOne( email );
    if (!user || !compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Check for existing blacklisted token and remove it
    const existingToken = req.header('Authorization');
    if (existingToken) {
      tokenBlacklist.delete(existingToken);
    }
    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
    console.log(token)
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function logout(req, res) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    verify(token, process.env.JWT_SECRET);
    // Add the token to the blacklist
    tokenBlacklist.add(token);
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Invalid token' });
  }
}

export async function  refresh  (req, res) {
  const { token } = req.body;

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const newToken = sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: newToken });
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Token is not valid' });
  }
};
