import express from 'express';
import TwoFactorController from '../controllers/twoFactorController.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

/**
 * ✅ Enable Two-Factor Authentication (User must be logged in)
 */
router.post('/enable-2fa', authenticateToken, async (req, res) => {
    await TwoFactorController.enableTwoFactor(req, res);
});

/**
 * ✅ Disable Two-Factor Authentication
 */
router.post('/disable-2fa', authenticateToken, async (req, res) => {
    await TwoFactorController.disableTwoFactor(req, res);
});

export default router;
