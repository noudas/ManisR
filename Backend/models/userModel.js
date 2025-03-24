import pool from '../DB/connect.js';
import twofactor from 'node-2fa';

class User {
    // ✅ Create a new user with email verification token
    static async createUser(first_name, last_name, username, email, telephone, passwordHash, authorization_level = 'user', verificationToken) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                `INSERT INTO users (first_name, last_name, username, email, telephone, password, authorization_level, verification_token, is_verified)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)`,
                [first_name, last_name, username, email, telephone, passwordHash, authorization_level, verificationToken]
            );
            return { id: result.insertId, first_name, last_name, username, email, telephone, authorization_level };
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }

    // ✅ Find user by username
    static async findByUsername(username) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT id, username, password AS passwordHash, authorization_level, is_verified FROM users WHERE username = ?`, 
                [username]
            );
            return rows.length ? rows[0] : null;
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }

    // ✅ Find user by verification token
    static async findByVerificationToken(token) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT id FROM users WHERE verification_token = ?`, [token]
            );
            return rows.length ? rows[0] : null;
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }

    // ✅ Mark user as verified
    static async verifyUser(id) {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                `UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?`, [id]
            );
            return true;
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }

    // ✅ Delete user
    static async deleteUser(id) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                `DELETE FROM users WHERE id = ?`, [id]
            );
            return result.affectedRows > 0;
        } finally {
            connection.release(); // ✅ RELEASE connection
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
        } finally {
            connection.release();
        }
    }


    // Two Factor Authentication

    static async enableTwoFactor(id) {
        const connection = await pool.getConnection();
        try {
            const newSecret = twofactor.generateSecret({ name: "ManishR", account: `user-${id}` });
            await connection.execute(
                `UPDATE users SET two_factor_token = ?, is_phone_verified = 1 WHERE id = ?`,
                [newSecret.secret, id]
            );
            return newSecret; // Return QR code & secret for user
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
            return true;
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
        } finally {
            connection.release();
        }
    }

    static async verifyTwoFactor(id, token) {
        const secret = await User.getTwoFactorSecret(id);
        if (!secret) return false; // 2FA not enabled

        const result = twofactor.verifyToken(secret, token);
        return result && result.delta === 0; // Token is valid
    }
}

export default User;
