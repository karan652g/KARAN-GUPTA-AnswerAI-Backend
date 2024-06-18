// src/routes/questionRoutes.js
import { Router } from 'express';
import { createQuestion, getQuestionById, getQuestionsByUserId } from '../controllers/questionController.mjs';
import authMiddleware from '../middleware/auth.mjs';
const router = Router();

router.post('/', authMiddleware, createQuestion);
router.get('/:questionId', authMiddleware, getQuestionById);
router.get('/user/:userId', authMiddleware, getQuestionsByUserId);

export default router;
