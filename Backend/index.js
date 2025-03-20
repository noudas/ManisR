import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createDatabaseConnection from './DB/connect.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());

// Database connection setup
async function attachDatabase(req, res, next) {
    try {
        req.db = await createDatabaseConnection(); // Attach DB connection to each request
        next();
    } catch (error) {
        console.error('❌ Database connection error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Routes
app.use('/api/v1/users', attachDatabase, userRoutes);

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
