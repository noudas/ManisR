import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken, clearTokenCookie } from '../utils/auth.js';
import { sendVerificationEmail } from '../utils/emailService.js';

/**
 * Handles user authentication: registration, login, logout, and email verification.
 */
class AuthController {
    // ✅ Register a new user with email verification
    async register(req, res) {
        try {
            const { first_name, last_name, username, email, telephone, password, authorization_level } = req.body;

            if (!first_name || !last_name || !username || !email || !telephone || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            const validRoles = ['user', 'admin'];
            const userRole = authorization_level || 'user';

            if (!validRoles.includes(userRole)) {
                return res.status(400).json({ error: "Invalid role specified" });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const verificationToken = await bcrypt.hash(email + Date.now(), 10);

            const user = await User.createUser(
                first_name, last_name, username, email, telephone, passwordHash, userRole, verificationToken
            );

            await sendVerificationEmail(email, verificationToken);

            return res.status(201).json({
                message: 'User created successfully. Please check your email to verify your account.',
                data: { id: user.id, username: user.username }
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create user', details: error.message });
        }
    }

    // ✅ Verify Email
    async verifyEmail(req, res) {
        try {
            const { token } = req.query;
            if (!token) {
                return res.status(400).json({ error: 'Verification token is required' });
            }

            const user = await User.findByVerificationToken(token);
            if (!user) {
                return res.status(400).json({ error: 'Invalid or expired token' });
            }

            await User.verifyUser(user.id);
            return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to verify email', details: error.message });
        }
    }

    // ✅ User Login
    async login(req, res) {
        try {
            const { username, password, twoFactorCode } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required' });
            }

            const user = await User.findByUsername(username);
            if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            if (!user.is_verified) {
                return res.status(403).json({ error: 'Please verify your email before logging in' });
            }

            const token = generateToken(user);
            return res.status(200).json({ message: 'Logged in successfully', token });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to log in', details: error.message });
        }
    }

    // ✅ Logout
    async logout(req, res) {
        try {
            clearTokenCookie(res);
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to log out', details: error.message });
        }
    }
}

export default new AuthController();
