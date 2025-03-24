// ./utils/verification.js

export function checkEmailVerified(req, res, next) {
    if (req.user.is_verified != 1) {
        return res.status(403).json({ error: 'Email verification required.' });
    }
    next();
}

export function checkPhoneVerified(req, res, next) {
    if (req.user.is_phone_verified != 1) {
        return res.status(403).json({ error: 'Phone not verified.' });
    }
    next();
}


export function checkAdmin(req, res, next) {
    if (req.user.authorization_level !== 'admin') {
        return res.status(403).json({ error: 'Admin access required.' });
    }
    next();
}
