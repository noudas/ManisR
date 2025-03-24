/**
 * User Controller - Handles User Authentication, Verification, and Profile Management
 *
 * Features:
 * - User Registration with Email Verification
 * - Login with Password & Optional 2FA
 * - Logout & Token Handling
 * - Profile Management (Update, Delete, Get)
 * - Two-Factor Authentication (2FA) via Google Authenticator
 */

import bcrypt from 'bcryptjs';
import qrcode from 'qrcode';
import User from '../models/userModel.js';
import { generateToken, clearTokenCookie } from '../utils/auth.js';
import { sendVerificationEmail } from '../utils/emailService.js';

class UserController {
    /**
     * Register a new user with email verification
     */
    async createUser(req, res) {
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

            // Hash the password and generate an email verification token
            const passwordHash = await bcrypt.hash(password, 10);
            const verificationToken = await bcrypt.hash(email + Date.now(), 10);

            // Create user and send verification email
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

    /**
     * Verify a user's email using the verification token
     */
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

    /**
     * Authenticate user and return JWT token (Supports 2FA if enabled)
     */
    async login(req, res) {
        try {
            const { username, password, twoFactorCode } = req.body;
    
            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required' });
            }
    
            const user = await User.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            if (!user.is_verified) {
                return res.status(403).json({ error: 'Please verify your email before logging in' });
            }
    
            const isValidPassword = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Check for 2FA authentication
            if (user.is_phone_verified) {
                if (!twoFactorCode) {
                    return res.status(206).json({ message: "2FA required. Please enter your authentication code." });
                }

                const isValid2FA = await User.verifyTwoFactor(user.id, twoFactorCode);
                if (!isValid2FA) {
                    return res.status(401).json({ error: "Invalid 2FA code." });
                }
            }
    
            const token = generateToken(user);
            return res.status(200).json({
                message: 'Logged in successfully',
                token,
                user: { id: user.id, username: user.username, role: user.authorization_level }
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to log in', details: error.message });
        }
    }

    /**
     * Log out user by clearing token cookie
     */
    async logout(req, res) {
        try {
            clearTokenCookie(res);
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to log out', details: error.message });
        }
    }

    /**
     * Retrieve authenticated user's profile
     */
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.json({
                id: user.id, first_name: user.first_name, last_name: user.last_name,
                username: user.username, email: user.email, telephone: user.telephone,
                role: user.authorization_level
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve profile', details: error.message });
        }
    }

    /**
     * Update user profile (Only the user or an admin can update)
     */
    async updateUser(req, res) {
        try {
            const { first_name, last_name, username, email, telephone, authorization_level, is_verified } = req.body;
            const { id } = req.params;

            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const updated = await User.updateUser(id, first_name, last_name, username, email, telephone, authorization_level, is_verified);
            if (!updated) {
                return res.status(400).json({ error: 'User update failed' });
            }

            return res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update user', details: error.message });
        }
    }

    /**
     * Delete a user (Admin Only)
     */
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const deleted = await User.deleteUser(id);
            if (!deleted) {
                return res.status(400).json({ error: 'User deletion failed' });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user', details: error.message });
        }
    }

    /**
     * Enable Two-Factor Authentication (2FA)
     */
    async enableTwoFactor(req, res) {
        try {
            const { id } = req.user;
            const newSecret = await User.enableTwoFactor(id);
            const qrCode = await qrcode.toDataURL(newSecret.uri);

            return res.status(200).json({ message: "2FA enabled.", qrCode, secret: newSecret.secret });
        } catch (error) {
            return res.status(500).json({ error: "Failed to enable 2FA", details: error.message });
        }
    }

    /**
     * Disable Two-Factor Authentication (2FA)
     */
    async disableTwoFactor(req, res) {
        try {
            await User.disableTwoFactor(req.user.id);
            return res.status(200).json({ message: "2FA disabled." });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to disable 2FA', details: error.message });
        }
    }
}

export default new UserController();
