import jwt from 'jsonwebtoken';

// Generate a JWT token for authenticated users
export function generateToken(user) {
    return jwt.sign(
        { 
            id: user.id, 
            username: user.username, 
            authorization_level: user.authorization_level, 
            is_verified: user.is_verified // Include email verification status 
        },
        process.env.JWT_SECRET,
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

        // Ensure the user is verified before allowing access
        if (!user.is_verified) {
            return res.status(403).json({ error: 'Email verification required.' });
        }

        req.user = user;
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
