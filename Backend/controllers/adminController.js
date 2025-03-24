import User from '../models/userModel/index.js';

/**
 * Admin Controller - Handles user management for admins.
 */
class AdminController {
    async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            return res.status(200).json({ message: 'Users retrieved successfully', users });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve users', details: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) return res.status(404).json({ error: 'User not found' });

            const deleted = await User.deleteUser(id);
            return deleted
                ? res.status(200).json({ message: 'User deleted successfully' })
                : res.status(400).json({ error: 'User deletion failed' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user', details: error.message });
        }
    }
}

export default new AdminController();
