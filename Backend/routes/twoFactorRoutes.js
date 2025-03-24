/**
 * Two-Factor Authentication (2FA) Routes
 * Handles enabling and disabling of 2FA for users.
 */

import express from 'express';
import TwoFactorController from '../controllers/twoFactorController.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

/**
 * POST /enable-2fa
 * Enables Two-Factor Authentication (Requires user authentication).
 */
router.post('/enable-2fa', authenticateToken, async (req, res) => {
    console.log(`🔒 [2FA] Enabling 2FA for user ID: ${req.user.id}`);
    await TwoFactorController.enableTwoFactor(req, res);
});

/**
 * POST /disable-2fa
 * Disables Two-Factor Authentication (Requires user authentication).
 */
router.post('/disable-2fa', authenticateToken, async (req, res) => {
    console.log(`🔓 [2FA] Disabling 2FA for user ID: ${req.user.id}`);
    await TwoFactorController.disableTwoFactor(req, res);
});

export default router;
