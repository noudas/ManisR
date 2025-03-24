import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import twoFactorRoutes from './twoFactorRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/two-factor', twoFactorRoutes);

export default router; // ✅ Use ES Module export
