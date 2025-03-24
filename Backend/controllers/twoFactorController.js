import qrcode from 'qrcode';
import User from '../models/userModel.js';

/**
 * Handles Two-Factor Authentication (2FA) setup and verification.
 */
class TwoFactorController {
    // ✅ Enable 2FA
    async enableTwoFactor(req, res) {
        try {
            const { id } = req.user;
            const newSecret = await User.enableTwoFactor(id);
            const qrCode = await qrcode.toDataURL(newSecret.uri);

            return res.status(200).json({ message: "2FA enabled.", qrCode, secret: newSecret.secret });
        } catch (error) {
            return res.status(500).json({ error: "Failed to enable 2FA", details: error.message });
        }
    }

    // ✅ Disable 2FA
    async disableTwoFactor(req, res) {
        try {
            await User.disableTwoFactor(req.user.id);
            return res.status(200).json({ message: "2FA disabled." });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to disable 2FA', details: error.message });
        }
    }
}

export default new TwoFactorController();
