// src/controllers/userController.mjs
import User from '../models/user.mjs';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};
