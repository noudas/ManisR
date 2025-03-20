// ./DB/connect.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function createDatabaseConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT, // Added missing port
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Verify connection
        await connection.execute('SELECT 1');
        console.log('✅ Database connected successfully');
        
        return connection;
    } catch (error) {
        console.error('❌ Error connecting to database:', error);
        throw error;
    }
}

// Export the function
export default createDatabaseConnection;
