/**
 * API Route Index
 * Aggregates all route modules for user authentication, management, 2FA, and admin actions.
 */

import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import twoFactorRoutes from './twoFactorRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

// Authentication & Authorization Routes
router.use('/auth', authRoutes);

// User Management Routes
router.use('/users', userRoutes);

// Two-Factor Authentication Routes
router.use('/two-factor', twoFactorRoutes);

// Admin Panel Routes (Restricted Access)
router.use('/admin', adminRoutes);

export default router;
