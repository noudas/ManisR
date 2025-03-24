import express from 'express';
import { body, validationResult } from 'express-validator';
import UserController from '../controllers/userController.js';
import { authenticateToken } from '../utils/auth.js';
import { checkAdmin, checkEmailVerified } from '../utils/verification.js';

const router = express.Router();

// ✅ Validation Middleware for Registration
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

// ✅ Validation Middleware for Login
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

// ✅ Register a new user (sends email verification)
router.post('/register', validateRegistration, async (req, res) => {
    await UserController.createUser(req, res);
});

// ✅ Email verification
router.get('/verify-email', async (req, res) => {
    await UserController.verifyEmail(req, res);
});

// ✅ User login (only if verified)
router.post('/login', validateLogin, async (req, res) => {
    await UserController.login(req, res);
});

// ✅ User logout
router.post('/logout', authenticateToken, async (req, res) => {
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
