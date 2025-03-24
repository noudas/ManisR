import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateToken } from '../utils/auth.js';
import { checkAdmin, checkEmailVerified } from '../utils/verification.js';

const router = express.Router();

/**
 * ✅ Get user profile (Must be authenticated & email verified)
 */
router.get('/profile', authenticateToken, checkEmailVerified, async (req, res) => {
    await UserController.getProfile(req, res);
});

/**
 * ✅ Update user details (Only the user or an admin can update)
 */
router.put('/update/:id', authenticateToken, async (req, res) => {
    await UserController.updateUser(req, res);
});

/**
 * ✅ Delete a user (Admin only)
 */
router.delete('/delete/:id', authenticateToken, checkAdmin, async (req, res) => {
    await UserController.deleteUser(req, res);
});

export default router;
