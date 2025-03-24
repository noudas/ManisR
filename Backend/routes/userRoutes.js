import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateToken } from '../utils/auth.js';
import { checkAdmin, checkEmailVerified } from '../utils/verification.js';

const router = express.Router();

// ✅ Register a new user (sends email verification)
router.post('/register', async (req, res) => {
    await UserController.createUser(req, res);
});

// ✅ Email verification
router.get('/verify-email', async (req, res) => {
    await UserController.verifyEmail(req, res);
});

// ✅ User login (only if verified)
router.post('/login', async (req, res) => {
    await UserController.login(req, res);
});

// ✅ User logout
router.post('/logout', async (req, res) => {
    await UserController.logout(req, res);
});

// ✅ Get user profile (must be authenticated & email verified)
router.get('/profile', authenticateToken, checkEmailVerified, async (req, res) => {
    await UserController.getProfile(req, res);
});

// ✅ Update user (only the user or an admin can update)
router.put('/update/:id', authenticateToken, async (req, res) => {
    await UserController.updateUser(req, res);
});

// ✅ Delete user (admin only)
router.delete('/delete/:id', authenticateToken, checkAdmin, async (req, res) => {
    await UserController.deleteUser(req, res);
});

// ✅ Enable 2FA (user must be logged in)
router.post('/enable-2fa', authenticateToken, async (req, res) => {
    await UserController.enableTwoFactor(req, res);
});

// ✅ Disable 2FA
router.post('/disable-2fa', authenticateToken, async (req, res) => {
    await UserController.disableTwoFactor(req, res);
});

export default router;
