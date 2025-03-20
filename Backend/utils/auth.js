//./utils/auth.js

import jwt from 'jsonwebtoken';

// Generate a JWT token for authenticated users
export function generateToken(user) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign(
        { id: user.id, username: user.username, authorization_level: user.authorization_level },
        process.env.JWT_SECRET,  // ✅ Make sure this is defined
        { expiresIn: '1h' }
    );
}

// Middleware to authenticate users via JWT
export function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Invalid token:", err.message);
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user; // Attach user object to request
        next();
    });
}

// Function to clear the JWT cookie (for logout)
export function clearTokenCookie(res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    });
}
