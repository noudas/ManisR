import User from '../models/userModel.js';

/**
 * Handles user profile, updates, and account management.
 */
class UserController {
    // ✅ Get user profile
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ error: 'User not found' });

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve profile', details: error.message });
        }
    }

    // ✅ Update user
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ error: 'User not found' });

            const updated = await User.updateUser(id, req.body);
            return updated
                ? res.status(200).json({ message: 'User updated successfully' })
                : res.status(400).json({ error: 'User update failed' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update user', details: error.message });
        }
    }

    // ✅ Delete user
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ error: 'User not found' });

            return (await User.deleteUser(id))
                ? res.status(200).json({ message: 'User deleted successfully' })
                : res.status(400).json({ error: 'User deletion failed' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user', details: error.message });
        }
    }
}

export default new UserController();
