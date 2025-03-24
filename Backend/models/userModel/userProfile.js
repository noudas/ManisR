/**
 * User Profile Management
 * Handles updating user details.
 */

import pool from '../../DB/connect.js';

export async function updateUser(id, updatedFields) {
    const connection = await pool.getConnection();
    try {
        const fields = Object.keys(updatedFields).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updatedFields);

        if (!fields) return false; // No fields to update

        const [result] = await connection.execute(
            `UPDATE users SET ${fields} WHERE id = ?`,
            [...values, id]
        );
        return result.affectedRows > 0;
    } finally {
        connection.release();
    }
}
