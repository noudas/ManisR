/**
 * Authentication Utility
 * Handles JWT generation, authentication, and logout.
 */

import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for authenticated users.
 * @param {Object} user - User object containing id, username, and authorization level.
 * @returns {string} JWT token.
 */
export function generateToken(user) {
    if (!process.env.JWT_SECRET) {
        throw new Error("❌ [Auth Error] JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            authorization_level: user.authorization_level,
            is_verified: user.is_verified
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

/**
 * Middleware to authenticate users via JWT.
 * Attaches user data to `req.user` if valid.
 */
export function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        console.warn("⚠️ [Auth Warning] No token provided in request.");
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.warn(`❌ [Auth Error] Invalid token: ${err.message}`);
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    });
}

/**
 * Clears the JWT cookie (for logout).
 * @param {Object} res - Express response object.
 */
export function clearTokenCookie(res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    });
    console.log("✅ [Auth] JWT cookie cleared (user logged out).");
}
