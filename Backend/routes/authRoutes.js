import express from 'express';
import { body, validationResult } from 'express-validator';
import AuthController from '../controllers/authController.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

/** Authentication & Email Verification Route*/

/**
 * ✅ Middleware to validate user registration input
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
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

/**
 * ✅ Middleware to validate login input
 */
const validateLogin = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

/**
 * ✅ Register a new user (Sends email verification)
 */
router.post('/register', validateRegistration, async (req, res) => {
    await AuthController.register(req, res);
});

/**
 * ✅ Verify user email
 */
router.get('/verify-email', async (req, res) => {
    await AuthController.verifyEmail(req, res);
});

/**
 * ✅ User login (only if verified)
 */
router.post('/login', validateLogin, async (req, res) => {
    await AuthController.login(req, res);
});

/**
 * ✅ User logout (requires authentication)
 */
router.post('/logout', authenticateToken, async (req, res) => {
    await AuthController.logout(req, res);
});

export default router;
