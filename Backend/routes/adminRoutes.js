import express from 'express';
import { checkAdmin } from '../utils/verification.js';
import { authenticateToken } from '../utils/auth.js';
import AdminController from '../controllers/adminController.js';

const router = express.Router();

// ✅ Get a list of all registered users (Admin only)
router.get('/users', authenticateToken, checkAdmin, async (req, res) => {
    await AdminController.getAllUsers(req, res);
});

// ✅ Delete a user by ID (Admin only)
router.delete('/users/:id', authenticateToken, checkAdmin, async (req, res) => {
    await AdminController.deleteUser(req, res);
});

export default router;
