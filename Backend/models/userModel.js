import createDatabaseConnection from '../DB/connect.js';

import createDatabaseConnection from '../DB/connect.js';

class User {
    constructor(id, first_name, last_name, username, email, telephone, passwordHash, authorization_level, is_verified) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.telephone = telephone;
        this.passwordHash = passwordHash;
        this.authorization_level = authorization_level;
        this.is_verified = is_verified;
    }

    // ✅ Create a new user
    static async createUser(first_name, last_name, username, email, telephone, passwordHash, authorization_level = 'user') {
        const connection = await createDatabaseConnection();
        try {
            const [result] = await connection.execute(
                `INSERT INTO users (first_name, last_name, username, email, telephone, password, authorization_level)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [first_name, last_name, username, email, telephone, passwordHash, authorization_level]
            );
            return new User(result.insertId, first_name, last_name, username, email, telephone, passwordHash, authorization_level, false);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        } finally {
            await connection.end(); // Close connection
        }
    }

    // ✅ Find user by username
    static async findByUsername(username) {
        const connection = await createDatabaseConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM users WHERE username = ?`, [username]
            );
            return rows.length ? new User(...Object.values(rows[0])) : null;
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    // ✅ Find user by ID
    static async findById(id) {
        const connection = await createDatabaseConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM users WHERE id = ?`, [id]
            );
            return rows.length ? new User(...Object.values(rows[0])) : null;
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    // ✅ Update user information (excluding password)
    static async updateUser(id, first_name, last_name, username, email, telephone, authorization_level, is_verified) {
        const connection = await createDatabaseConnection();
        try {
            const [result] = await connection.execute(
                `UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ?, telephone = ?, authorization_level = ?, is_verified = ?
                WHERE id = ?`,
                [first_name, last_name, username, email, telephone, authorization_level, is_verified, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    // ✅ Delete user by ID
    static async deleteUser(id) {
        const connection = await createDatabaseConnection();
        try {
            const [result] = await connection.execute(
                `DELETE FROM users WHERE id = ?`, [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }
}

export default User;
