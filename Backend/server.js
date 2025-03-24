import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import Honeypot from 'honeypot'; // ✅ Correct import
import pool from './DB/connect.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const honeypot = new Honeypot(process.env.HONEYPOT_API_KEY); // ✅ Initialize honeypot with API key

// ✅ Security Middleware
app.use(helmet()); // Protects against common vulnerabilities
app.use(cors({ origin: '*' }));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use(morgan('combined')); // Logs all HTTP requests

// ✅ Honeypot Middleware (Check if IP is a spammer)
app.use(async (req, res, next) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        honeypot.query(ip, (err, response) => {
            if (err) {
                console.error('❌ Honeypot API Error:', err);
                return next(); // Allow request to continue even if honeypot fails
            }

            if (response) {
                console.warn(`🚨 Spam request blocked from IP: ${ip}`);
                console.log(response.getFormattedResponse()); // Log the spammer details
                return res.status(403).json({ error: 'Request blocked: Detected as spam' });
            }

            next(); // Proceed if IP is not in the honeypot database
        });
    } catch (error) {
        console.error('❌ Unexpected Honeypot Middleware Error:', error);
        next(); // Let the request continue to prevent server crashes
    }
});

// ✅ Database Connection Middleware
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

// ✅ Routes
app.use('/api/v1/users', userRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
