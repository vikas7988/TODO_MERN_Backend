import { Router } from 'express';
const router = Router();
import { getUserProfile } from '../controllers/userControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.get('/profile', authMiddleware, getUserProfile);

export default router;
