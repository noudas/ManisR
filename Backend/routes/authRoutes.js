/**
 * Authentication & Email Verification Routes
 * Handles user registration, login, logout, and email verification.
 */

import express from 'express';
import { body, validationResult } from 'express-validator';
import AuthController from '../controllers/authController.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

/**
 * Middleware to validate user registration input.
 */
const validateRegistration = [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('telephone').trim().notEmpty().withMessage('Telephone is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.warn("⚠️ [Validation Error] Registration input validation failed.");
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

/**
 * Middleware to validate login input.
 */
const validateLogin = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.warn("⚠️ [Validation Error] Login input validation failed.");
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

/**
 * POST /register
 * Registers a new user and sends an email verification link.
 */
router.post('/register', validateRegistration, async (req, res) => {
    console.log(`📝 [Auth] Registration attempt for username: ${req.body.username}`);
    await AuthController.register(req, res);
});

/**
 * GET /verify-email
 * Verifies a user's email using a token.
 */
router.get('/verify-email', async (req, res) => {
    console.log(`📩 [Auth] Email verification attempt with token: ${req.query.token}`);
    await AuthController.verifyEmail(req, res);
});

/**
 * POST /login
 * Authenticates a user (only if email is verified).
 */
router.post('/login', validateLogin, async (req, res) => {
    console.log(`🔑 [Auth] Login attempt for username: ${req.body.username}`);
    await AuthController.login(req, res);
});

/**
 * POST /logout
 * Logs out a user (requires authentication).
 */
router.post('/logout', authenticateToken, async (req, res) => {
    console.log(`🚪 [Auth] Logout attempt for user ID: ${req.user.id}`);
    await AuthController.logout(req, res);
});

export default router;
