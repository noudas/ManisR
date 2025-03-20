// ./utils/verification.js

export function checkEmailVerified(req, res, next) {
    if (!req.user.is_verified) {
        return res.status(403).json({ error: 'Email verification required.' });
    }
    next();
}

export function checkAdmin(req, res, next) {
    if (req.user.authorization_level !== 'admin') {
        return res.status(403).json({ error: 'Admin access required.' });
    }
    next();
}
