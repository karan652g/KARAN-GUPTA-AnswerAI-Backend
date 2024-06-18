import Question from '../models/question.mjs';
import { generateAnswer } from '../services/openai.mjs';

export const createQuestion = async (req, res) => {
  try {
    const { questionText } = req.body;
    const answerText = await generateAnswer(questionText);

    const question = new Question({
      userId: req.user._id,
      questionText,
      answerText,
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQuestionsByUserId = async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.params.userId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
