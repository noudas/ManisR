import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database Connection Pool
 * Manages MySQL connections with a limited pool size.
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5, // Limits simultaneous connections
    queueLimit: 0
});

// Test the database connection on startup
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`✅ [Database] Connected to ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        connection.release();
    } catch (error) {
        console.error(`❌ [Database] Connection failed: ${error.message}`);
        process.exit(1); // Stop the server if the database is unavailable
    }
})();

export default pool;
