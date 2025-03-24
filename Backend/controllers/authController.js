import bcrypt from 'bcryptjs';
import User from '../models/userModel/index.js';
import { generateToken, clearTokenCookie } from '../utils/auth.js';
import { sendVerificationEmail } from '../utils/emailService.js';

/**
 * Authentication Controller
 * Handles user registration, login, logout, and email verification.
 */
class AuthController {
    async register(req, res) {
        try {
            const { first_name, last_name, username, email, telephone, password, authorization_level } = req.body;
    
            if (!first_name || !last_name || !username || !email || !telephone || !password) {
                console.warn(`[Auth] Registration failed: Missing required fields.`);
                return res.status(400).json({ error: 'All fields are required' });
            }
    
            console.log(`[Auth] Registration attempt for: ${username} (${email})`);
    
            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                console.warn(`[Auth] Registration failed: Username already exists (${username})`);
                return res.status(400).json({ error: 'Username already exists' });
            }
    
            const validRoles = ['user', 'admin'];
            const userRole = authorization_level || 'user';
            if (!validRoles.includes(userRole)) {
                console.warn(`[Auth] Invalid role specified: ${authorization_level}`);
                return res.status(400).json({ error: 'Invalid role specified' });
            }
    
            // ✅ Generate email verification token
            const verificationToken = Buffer.from(email + Date.now()).toString('hex');
    
            // ✅ Create user in the database (password is hashed inside `createUser`)
            const user = await User.createUser(first_name, last_name, username, email, telephone, password, userRole, verificationToken);
    
            // ✅ Send verification email
            await sendVerificationEmail(email, verificationToken);
    
            console.log(`[Auth] New user registered successfully: ${username} (${email})`);
            return res.status(201).json({
                message: 'User created successfully. Please check your email to verify your account.',
                data: { id: user.id, username: user.username }
            });
    
        } catch (error) {
            console.error(`[Auth] Registration failed: ${error.message}`);
            return res.status(500).json({ error: 'Failed to create user', details: error.message });
        }
    }
    
    

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
            console.log(`[Auth] Email verified: User ID ${user.id}`);
            return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
        } catch (error) {
            console.error(`[Auth] Email verification failed: ${error.message}`);
            return res.status(500).json({ error: 'Failed to verify email', details: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password, twoFactorCode } = req.body;
    
            if (!username || !password) {
                console.warn(`[Auth] Login failed: Missing username or password.`);
                return res.status(400).json({ error: 'Username and password are required' });
            }
    
            console.log(`[Auth] Login attempt for username: ${username}`);
            const user = await User.findByUsername(username);
    
            if (!user) {
                console.warn(`[Auth] User not found: ${username}`);
                return res.status(401).json({ error: 'Invalid username or password' });
            }
    
            console.log(`[Auth] User found: ID=${user.id}, Username=${user.username}`);
    
            if (!user.passwordHash) {
                console.error(`[Auth] Password hash missing for user: ${username}`);
                return res.status(500).json({ error: 'Internal server error' });
            }
    
            const isValidPassword = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPassword) {
                console.warn(`[Auth] Incorrect password for user: ${username}`);
                return res.status(401).json({ error: 'Invalid username or password' });
            }
    
            if (!user.is_verified) {
                console.warn(`[Auth] User email not verified: ${username}`);
                return res.status(403).json({ error: 'Please verify your email before logging in' });
            }
    
            if (user.is_phone_verified != 0) {
                console.log(`[Auth] 2FA is enabled for user: ${username}`);
    
                // 🚨 **Fix: Force user to enter a 2FA code**
                if (!twoFactorCode) {
                    console.warn(`[Auth] 2FA required for user: ${username}`);
                    return res.status(401).json({ error: 'Two-Factor Authentication (2FA) code is required' });
                }
    
                // ✅ Verify 2FA code
                const isValid2FA = await User.verifyTwoFactor(user.id, twoFactorCode);
                if (!isValid2FA) {
                    console.warn(`[Auth] Invalid 2FA code for user: ${username}`);
                    return res.status(401).json({ error: 'Invalid Two-Factor Authentication (2FA) code' });
                }
            }    
    
            const token = generateToken(user);
            console.log(`[Auth] User logged in successfully: ${username}`);
            return res.status(200).json({ message: 'Logged in successfully', token });
    
        } catch (error) {
            console.error(`[Auth] Login failed: ${error.message}`);
            return res.status(500).json({ error: 'Failed to log in', details: error.message });
        }
    }
    

    async logout(req, res) {
        try {
            clearTokenCookie(res);
            console.log(`[Auth] User logged out`);
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error(`[Auth] Logout failed: ${error.message}`);
            return res.status(500).json({ error: 'Failed to log out', details: error.message });
        }
    }
}

export default new AuthController();
