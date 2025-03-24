/**
 * Express Server Configuration with Security & Middleware
 *
 * This server setup includes:
 * - Security middleware: Helmet (security headers), CORS (cross-origin requests), Rate Limiting
 * - Request logging with Morgan
 * - Spam protection using Honeypot API
 * - Database connection management with MySQL2
 * - User authentication and management routes
 */

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import Honeypot from 'honeypot';
import pool from './DB/connect.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const honeypot = new Honeypot(process.env.HONEYPOT_API_KEY);

// Security & Middleware
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rate Limiting: Limits requests per IP to prevent abuse (100 per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use(morgan('combined')); // Logs HTTP requests

// Honeypot Spam Protection Middleware
app.use(async (req, res, next) => {
    try {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Convert IPv6 localhost (::1) to IPv4 (127.0.0.1)
        if (ip === '::1') ip = '127.0.0.1';

        // Skip Honeypot check for localhost
        if (ip === '127.0.0.1') {
            console.log("🛑 Skipping Honeypot check for localhost.");
            return next();
        }

        honeypot.query(ip, (err, response) => {
            if (err) {
                console.error('❌ Honeypot API Error:', err);
                return next(); // Allow request to proceed if Honeypot API fails
            }

            if (response) {
                console.warn(`🚨 Spam request blocked from IP: ${ip}`);
                console.log(response.getFormattedResponse()); // Log spammer details
                return res.status(403).json({ error: 'Request blocked: Detected as spam' });
            }

            next(); // Proceed if IP is not in the honeypot database
        });
    } catch (error) {
        console.error('❌ Unexpected Honeypot Middleware Error:', error);
        next(); // Prevent server crashes
    }
});

// Database Connection Middleware
app.use(async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        req.db = connection;

        res.on('finish', () => connection.release()); // Release DB connection when response finishes

        next();
    } catch (error) {
        console.error('❌ Database connection error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Routes
app.use('/api/v1/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
