import pool from '../DB/connect.js';

class User {
    // ✅ CREATE USER
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

    // ✅ FIND USER BY USERNAME
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
            connection.release();
        }
    }

    // ✅ FIND USER BY ID
    static async findById(id) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM users WHERE id = ?`, [id]
            );
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw error;
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }

    // ✅ UPDATE USER
    static async updateUser(id, first_name, last_name, username, email, telephone, authorization_level, is_verified) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                `UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ?, telephone = ?, authorization_level = ?, is_verified = ?
                WHERE id = ?`,
                [first_name, last_name, username, email, telephone, authorization_level, is_verified, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        } finally {
            connection.release(); // ✅ RELEASE connection
        }
    }

    // ✅ DELETE USER
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
