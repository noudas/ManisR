/**
 * User Authentication
 * Handles user registration, password hashing, and email verification.
 */

import pool from '../../DB/connect.js';
import bcrypt from 'bcryptjs';

export async function createUser(first_name, last_name, username, email, telephone, password, authorization_level, verificationToken) {
    const connection = await pool.getConnection();
    try {
        console.log(`[DB] Creating user: ${username}`);

        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await connection.execute(
            `INSERT INTO users (first_name, last_name, username, email, telephone, password, authorization_level, verification_token, is_verified)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)`,
            [first_name, last_name, username, email, telephone, passwordHash, authorization_level, verificationToken]
        );

        console.log(`[DB] User created successfully: ID=${result.insertId}`);
        return { id: result.insertId, first_name, last_name, username, email, telephone, authorization_level };
    } finally {
        connection.release();
    }
}


export async function verifyUser(id) {
    const connection = await pool.getConnection();
    try {
        await connection.execute(
            `UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?`, [id]
        );
        return true;
    } finally {
        connection.release();
    }
}

export async function findByVerificationToken(token) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(`SELECT id FROM users WHERE verification_token = ?`, [token]);
        return rows.length ? rows[0] : null;
    } finally {
        connection.release();
    }
}
