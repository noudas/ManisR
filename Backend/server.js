import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import pool from './DB/connect.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// ✅ Ensure each request gets a new connection and releases it
app.use(async (req, res, next) => {
    const connection = await pool.getConnection();
    req.db = connection;
    res.on('finish', () => {
        connection.release(); // ✅ RELEASE connection when response finishes
    });
    next();
});

// Routes
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
