/**
 * Admin Routes
 * Handles user management operations restricted to administrators.
 */

import express from 'express';
import { checkAdmin } from '../utils/verification.js';
import { authenticateToken } from '../utils/auth.js';
import AdminController from '../controllers/adminController.js';

const router = express.Router();

/**
 * GET /users
 * Retrieves a list of all registered users (Admin only).
 */
router.get('/users', authenticateToken, checkAdmin, async (req, res) => {
    console.log(`👨‍💼 [Admin] User list requested by Admin ID: ${req.user.id}`);
    await AdminController.getAllUsers(req, res);
});

/**
 * DELETE /users/:id
 * Deletes a user by ID (Admin only).
 */
router.delete('/users/:id', authenticateToken, checkAdmin, async (req, res) => {
    console.log(`🚨 [Admin] Deletion request for User ID: ${req.params.id} by Admin ID: ${req.user.id}`);
    await AdminController.deleteUser(req, res);
});

export default router;
