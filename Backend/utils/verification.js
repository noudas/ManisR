/**
 * Verification Middleware
 * Ensures users meet required authentication levels before proceeding.
 */

export function checkEmailVerified(req, res, next) {
    if (req.user.is_verified !== 1) {
        console.warn(`[Access Denied] User ${req.user.id} attempted to proceed without email verification.`);
        return res.status(403).json({ error: 'Email verification required.' });
    }
    next();
}

export function checkPhoneVerified(req, res, next) {
    if (req.user.is_phone_verified !== 1) {
        console.warn(`[Access Denied] User ${req.user.id} attempted to proceed without phone verification.`);
        return res.status(403).json({ error: 'Phone not verified.' });
    }
    next();
}

export function checkAdmin(req, res, next) {
    if (req.user.authorization_level !== 'admin') {
        console.warn(`[Unauthorized Access] User ${req.user.id} attempted to access an admin-only route.`);
        return res.status(403).json({ error: 'Admin access required.' });
    }
    next();
}
