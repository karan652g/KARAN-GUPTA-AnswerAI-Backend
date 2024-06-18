// tests/questionModel.test.js

import mongoose from 'mongoose';
import Question from '../models/Question.mjs';
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
  // Clear the Question collection before each test
  await Question.deleteMany({});
});

describe('Question Model', () => {
  it('should create a new question', async () => {
    const questionData = {
      questionText: 'What is Node.js?',
      userId : new mongoose.Types.ObjectId(),
    };

    const question = new Question(questionData);
    await question.save();

    const foundQuestion = await Question.findOne({ questionText: 'What is Node.js?' });
    expect(foundQuestion).toBeDefined();
    expect(foundQuestion.questionText).toBe(questionData.questionText);
  });

  it('should not allow a question without required fields', async () => {
    const questionData = {
      answerText: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      userId: new mongoose.Types.ObjectId(),
    };

    const question = new Question(questionData);
    await expect(question.save()).rejects.toThrow();
  });

  it('should retrieve a question by ID', async () => {
    const questionData = {
      questionText: 'What is Node.js?',
      answerText: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      userId: new mongoose.Types.ObjectId(),
    };

    const question = new Question(questionData);
    await question.save();

    const foundQuestion = await Question.findById(question._id);
    expect(foundQuestion).toBeDefined();
    expect(foundQuestion.questionText).toBe(questionData.questionText);
    expect(foundQuestion.answerText).toBe(questionData.answerText);
  });

  it('should delete a question by ID', async () => {
    const questionData = {
      questionText: 'What is Node.js?',
      answerText: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      userId: new mongoose.Types.ObjectId(),
    };

    const question = new Question(questionData);
    await question.save();

    await Question.findByIdAndDelete(question._id);

    const foundQuestion = await Question.findById(question._id);
    expect(foundQuestion).toBeNull();
  });
});
