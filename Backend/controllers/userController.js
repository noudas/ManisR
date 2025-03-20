import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken, clearTokenCookie } from '../utils/auth.js';

class UserController {
    // ✅ Create a new user
    async createUser(req, res) {
        try {
            const { first_name, last_name, username, email, telephone, password, authorization_level } = req.body;

            // Input validation
            if (!first_name || !last_name || !username || !email || !telephone || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Check if user already exists
            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Validate role
            const validRoles = ['user', 'admin'];
            const userRole = authorization_level || 'user'; // Default to 'user'

            if (!validRoles.includes(userRole)) {
                return res.status(400).json({ error: "Invalid role specified" });
            }

            // Hash the password before saving
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await User.createUser(first_name, last_name, username, email, telephone, passwordHash, userRole);

            return res.status(201).json({
                message: 'User created successfully',
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.authorization_level
                }
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Failed to create user',
                details: error.message
            });
        }
    }

    // ✅ User login
    async login(req, res) {
        try {
            const { username, password } = req.body;
    
            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required' });
            }
    
            const user = await User.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
    
            if (!user.passwordHash) {  // ✅ Check if passwordHash is missing
                return res.status(500).json({ error: 'Password is missing in the database' });
            }
    
            const isValidPassword = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
    
            const token = generateToken(user);
            return res.status(200).json({
                message: 'Logged in successfully',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.authorization_level
                }
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Failed to log in',
                details: error.message
            });
        }
    }
    
    // ✅ Logout user
    async logout(req, res) {
        try {
            clearTokenCookie(res);

            return res.status(200).json({
                message: 'Logged out successfully',
                data: null
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Failed to log out',
                details: error.message
            });
        }
    }

    // ✅ Get user profile
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                telephone: user.telephone,
                role: user.authorization_level
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to retrieve profile',
                details: error.message
            });
        }
    }

    // ✅ Update user
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
            return res.status(500).json({
                error: 'Failed to update user',
                details: error.message
            });
        }
    }

    // ✅ Delete user
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
            return res.status(500).json({
                error: 'Failed to delete user',
                details: error.message
            });
        }
    }
}

export default new UserController();
