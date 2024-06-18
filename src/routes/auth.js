// src/routes/authRoutes.js
import { Router } from 'express';
import { login, logout, refresh } from '../controllers/authController.mjs';
const router = Router();

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);


export default router;
