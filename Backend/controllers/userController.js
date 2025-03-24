import User from '../models/userModel.js';

/**
 * User Controller
 * Manages user profile retrieval, updates, and account deletion.
 */
class UserController {
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                console.warn(`[User] Profile not found for User ID: ${req.user.id}`);
                return res.status(404).json({ error: 'User not found' });
            }

            console.log(`[User] Profile retrieved for User ID: ${req.user.id}`);
            return res.json(user);
        } catch (error) {
            console.error(`[User] Failed to retrieve profile - ${error.message}`);
            return res.status(500).json({ error: 'Failed to retrieve profile', details: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                console.warn(`[User] Update failed - User not found (ID: ${id})`);
                return res.status(404).json({ error: 'User not found' });
            }

            const updated = await User.updateUser(id, req.body);
            if (updated) {
                console.log(`[User] Updated successfully (ID: ${id})`);
                return res.status(200).json({ message: 'User updated successfully' });
            } else {
                console.warn(`[User] Update failed (ID: ${id})`);
                return res.status(400).json({ error: 'User update failed' });
            }
        } catch (error) {
            console.error(`[User] Failed to update user (ID: ${req.params.id}) - ${error.message}`);
            return res.status(500).json({ error: 'Failed to update user', details: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                console.warn(`[User] Deletion failed - User not found (ID: ${id})`);
                return res.status(404).json({ error: 'User not found' });
            }

            if (await User.deleteUser(id)) {
                console.log(`[User] Deleted successfully (ID: ${id})`);
                return res.status(200).json({ message: 'User deleted successfully' });
            } else {
                console.warn(`[User] Deletion failed (ID: ${id})`);
                return res.status(400).json({ error: 'User deletion failed' });
            }
        } catch (error) {
            console.error(`[User] Failed to delete user (ID: ${req.params.id}) - ${error.message}`);
            return res.status(500).json({ error: 'Failed to delete user', details: error.message });
        }
    }
}

export default new UserController();
