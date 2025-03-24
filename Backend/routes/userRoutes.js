/**
 * User Routes
 * Handles user profile retrieval, updates, and deletion.
 */

import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateToken } from '../utils/auth.js';
import { checkAdmin, checkEmailVerified } from '../utils/verification.js';

const router = express.Router();

/**
 * GET /profile
 * Retrieves user profile (requires authentication & verified email).
 */
router.get('/profile', authenticateToken, checkEmailVerified, async (req, res) => {
    console.log(`📌 [User Route] Retrieving profile for user ID: ${req.user.id}`);
    await UserController.getProfile(req, res);
});

/**
 * PUT /update/:id
 * Updates user details (accessible by the user or an admin).
 */
router.put('/update/:id', authenticateToken, async (req, res) => {
    console.log(`🔄 [User Route] Update request for user ID: ${req.params.id}`);
    await UserController.updateUser(req, res);
});

/**
 * DELETE /delete/:id
 * Deletes a user (admin only).
 */
router.delete('/delete/:id', authenticateToken, checkAdmin, async (req, res) => {
    console.log(`🚨 [Admin Action] User deletion request for ID: ${req.params.id}`);
    await UserController.deleteUser(req, res);
});

export default router;
