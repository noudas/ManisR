import 'dotenv/config'; // Ensures environment variables are loaded
import createDatabaseConnection from "./DB/connect.js";

async function main() {
    try {
        const connection = await createDatabaseConnection();
        console.log("✅ Database connection established in main function");
        
        // Close connection when done
        await connection.end();
    } catch (error) {
        console.error('❌ Failed to establish database connection:', error);
    }
}

main();
