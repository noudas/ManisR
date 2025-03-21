import pool from '../DB/connect.js';

class User {
    static async createUser(first_name, last_name, username, email, telephone, passwordHash, authorization_level = 'user') {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                `INSERT INTO users (first_name, last_name, username, email, telephone, password, authorization_level)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [first_name, last_name, username, email, telephone, passwordHash, authorization_level]
            );
            return { id: result.insertId, first_name, last_name, username, email, telephone, authorization_level };
        } catch (error) {
            throw error;
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }

    static async findByUsername(username) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT id, username, password AS passwordHash, authorization_level FROM users WHERE username = ?`, 
                [username]
            );
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw error;
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }

    static async deleteUser(id) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                `DELETE FROM users WHERE id = ?`, [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }
}

export default User;
