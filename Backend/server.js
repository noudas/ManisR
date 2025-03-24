/**
 * Express Server Configuration with Security & Middleware
 *
 * Features:
 * - Security Middleware: Helmet (security headers), CORS (cross-origin requests), Rate Limiting
 * - Logging: Morgan for detailed request logging
 * - Spam Protection: Honeypot API for blocking known spammers
 * - Database Connection: MySQL2 with connection pooling
 * - Modular API Routes:
 *   - `/api/v1/auth` → Authentication (Register, Login, Email Verification, Logout)
 *   - `/api/v1/users` → User Profile Management (Get, Update, Delete)
 *   - `/api/v1/two-factor` → Two-Factor Authentication (Enable/Disable 2FA)
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
import routes from './routes/index.js';

const app = express();
const honeypot = new Honeypot(process.env.HONEYPOT_API_KEY);

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use(morgan('combined'));

// Honeypot Middleware for Spam Protection
app.use(async (req, res, next) => {
    try {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (ip === '::1') ip = '127.0.0.1';

        if (ip === '127.0.0.1') {
            console.log("[Honeypot] Localhost detected, skipping spam check.");
            return next();
        }

        honeypot.query(ip, (err, response) => {
            if (err) {
                console.error(`[Honeypot] API Error: ${err.message}`);
                return next();
            }

            if (response) {
                console.warn(`[Honeypot] Blocked spam request from IP: ${ip}`);
                return res.status(403).json({ error: 'Request blocked: Detected as spam' });
            }

            next();
        });
    } catch (error) {
        console.error(`[Honeypot] Unexpected Error: ${error.message}`);
        next();
    }
});

// Database Connection Middleware
app.use(async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        req.db = connection;
        res.on('finish', () => connection.release());
        next();
    } catch (error) {
        console.error(`[Database] Connection Error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Register API Routes
app.use('/api/v1', routes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
