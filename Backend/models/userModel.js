/**
 * User Model - Handles Database Operations for User Management
 *
 * Provides database interactions for:
 * - User creation, authentication, and verification
 * - Two-Factor Authentication (2FA) setup and validation
 * - User lookup, update, and deletion
 */

import pool from '../DB/connect.js';
import twofactor from 'node-2fa';

class User {
    static async createUser(first_name, last_name, username, email, telephone, passwordHash, authorization_level = 'user', verificationToken) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                `INSERT INTO users (first_name, last_name, username, email, telephone, password, authorization_level, verification_token, is_verified)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)`,
                [first_name, last_name, username, email, telephone, passwordHash, authorization_level, verificationToken]
            );
            console.log(`[User] Created: ${username} (${email})`);
            return { id: result.insertId, first_name, last_name, username, email, telephone, authorization_level };
        } catch (error) {
            console.error(`[User] Creation Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async findByUsername(username) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT id, username, password AS passwordHash, authorization_level, is_verified FROM users WHERE username = ?`, 
                [username]
            );
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error(`[User] Find By Username Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async findByVerificationToken(token) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT id FROM users WHERE verification_token = ?`, [token]
            );
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error(`[User] Find By Verification Token Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async verifyUser(id) {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                `UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?`, [id]
            );
            console.log(`[User] Verified: ID ${id}`);
            return true;
        } catch (error) {
            console.error(`[User] Verification Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async findById(id) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT id, first_name, last_name, username, email, telephone, authorization_level, is_verified FROM users WHERE id = ?`, 
                [id]
            );
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error(`[User] Find By ID Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async deleteUser(id) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(`DELETE FROM users WHERE id = ?`, [id]);
            if (result.affectedRows > 0) {
                console.log(`[User] Deleted: ID ${id}`);
            } else {
                console.warn(`[User] Deletion Failed: ID ${id} Not Found`);
            }
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`[User] Deletion Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    // ============================== 2FA Methods ==============================

    static async enableTwoFactor(id) {
        const connection = await pool.getConnection();
        try {
            const newSecret = twofactor.generateSecret({ name: "ManishR", account: `user-${id}` });
            await connection.execute(
                `UPDATE users SET two_factor_token = ?, is_phone_verified = 1 WHERE id = ?`,
                [newSecret.secret, id]
            );
            console.log(`[2FA] Enabled for User ID: ${id}`);
            return newSecret;
        } catch (error) {
            console.error(`[2FA] Enable Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async disableTwoFactor(id) {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                `UPDATE users SET two_factor_token = NULL, is_phone_verified = 0 WHERE id = ?`,
                [id]
            );
            console.log(`[2FA] Disabled for User ID: ${id}`);
            return true;
        } catch (error) {
            console.error(`[2FA] Disable Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getTwoFactorSecret(id) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT two_factor_token FROM users WHERE id = ?`, [id]
            );
            return rows.length ? rows[0].two_factor_token : null;
        } catch (error) {
            console.error(`[2FA] Get Secret Failed - ${error.message}`);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async verifyTwoFactor(id, token) {
        try {
            const secret = await User.getTwoFactorSecret(id);
            if (!secret) return false;

            const result = twofactor.verifyToken(secret, token);
            return result && result.delta === 0;
        } catch (error) {
            console.error(`[2FA] Verification Failed - ${error.message}`);
            throw error;
        }
    }
}

export default User;
