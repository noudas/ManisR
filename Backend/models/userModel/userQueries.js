/**
 * User Queries
 * Provides methods for retrieving and deleting user data.
 */

import pool from '../../DB/connect.js';

export async function findByUsername(username) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            `SELECT id, username, password AS passwordHash, authorization_level, is_verified, gender FROM users WHERE username = ?`,
            [username]
        );
        return rows.length ? rows[0] : null;
    } finally {
        connection.release();
    }
}

export async function findById(id) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            `SELECT id, first_name, last_name, username, email, telephone, authorization_level, is_verified, gender FROM users WHERE id = ?`,
            [id]
        );
        return rows.length ? rows[0] : null;
    } finally {
        connection.release();
    }
}

export async function deleteUser(id) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(`DELETE FROM users WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    } finally {
        connection.release();
    }
}

export async function getAllUsers() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            `SELECT id, first_name, last_name, username, email, telephone, authorization_level, is_verified, gender FROM users`
        );
        return rows;
    } finally {
        connection.release();
    }
}
