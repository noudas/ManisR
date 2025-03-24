/**
 * Two-Factor Authentication (2FA)
 * Manages enabling, disabling, and verifying 2FA.
 */

import pool from '../../DB/connect.js';
import twofactor from 'node-2fa';

export async function enableTwoFactor(id) {
    const connection = await pool.getConnection();
    try {
        const newSecret = twofactor.generateSecret({ name: "ManishR", account: `user-${id}` });
        await connection.execute(
            `UPDATE users SET two_factor_token = ?, is_phone_verified = 1 WHERE id = ?`,
            [newSecret.secret, id]
        );
        return newSecret;
    } finally {
        connection.release();
    }
}

export async function disableTwoFactor(id) {
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

export async function verifyTwoFactor(id, token) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            `SELECT two_factor_token FROM users WHERE id = ?`, [id]
        );
        if (!rows.length) return false;

        const result = twofactor.verifyToken(rows[0].two_factor_token, token);
        return result && result.delta === 0;
    } finally {
        connection.release();
    }
}
