// src/routes/userRoutes.js
import { Router } from 'express';
import { createUser, getUserById } from '../controllers/userController.mjs';
const router = Router();

router.post('/', createUser);
router.get('/:userId', getUserById);

export default router;
