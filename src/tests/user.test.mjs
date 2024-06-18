// tests/userModel.test.js

import mongoose from 'mongoose';
import User from '../models/user.mjs';
import { config } from 'dotenv';

config();

let connection;

const MONGODB_URI = process.env.MONGO_URI;

beforeAll(async () => {
  // Connect to the MongoDB test database before all tests
  connection = await mongoose.connect(MONGODB_URI, {
  });
});

afterAll(async () => {
  // Disconnect from the MongoDB test database after all tests
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear the User collection before each test
  await User.deleteMany({});
});

describe('User Model', () => {
  it('should create a new user', async () => {
    const userData = {
      password: 'password',
      email: 'testuser@example.com',
    };

    const user = new User(userData);
    await user.save();

    const foundUser = await User.findOne({ email: 'testuser@example.com' });
    expect(foundUser).toBeDefined();
    expect(foundUser.email).toBe(userData.email);
  });

  it('should not allow duplicate usernames', async () => {
    const userData = {
      username: 'testuser',
      password: 'password',
      email: 'testuser@example.com',
    };

    const user1 = new User(userData);
    await user1.save();

    const user2 = new User(userData);
    await expect(user2.save()).rejects.toThrow();
  });
});
