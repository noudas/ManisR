// server.js

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

app.use(async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        req.db = connection;

        res.on('finish', () => {
            connection.release();
        });

        next();
    } catch (error) {
        console.error('❌ Database connection error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Routes
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
