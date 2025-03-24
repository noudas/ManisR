import qrcode from 'qrcode';
import User from '../models/userModel/index.js';

/**
 * Two-Factor Authentication (2FA) Controller
 * Manages enabling and disabling of 2FA for user accounts.
 */
class TwoFactorController {
    async enableTwoFactor(req, res) {
        try {
            const { id } = req.user;
            const newSecret = await User.enableTwoFactor(id);
            const qrCode = await qrcode.toDataURL(newSecret.uri);

            console.log(`[2FA] Enabled for User ID: ${id}`);
            return res.status(200).json({ message: "2FA enabled.", qrCode, secret: newSecret.secret });
        } catch (error) {
            console.error(`[2FA] Failed to enable for User ID: ${req.user?.id || "Unknown"} - ${error.message}`);
            return res.status(500).json({ error: "Failed to enable 2FA", details: error.message });
        }
    }

    async disableTwoFactor(req, res) {
        try {
            await User.disableTwoFactor(req.user.id);
            console.log(`[2FA] Disabled for User ID: ${req.user.id}`);
            return res.status(200).json({ message: "2FA disabled." });
        } catch (error) {
            console.error(`[2FA] Failed to disable for User ID: ${req.user?.id || "Unknown"} - ${error.message}`);
            return res.status(500).json({ error: 'Failed to disable 2FA', details: error.message });
        }
    }
}

export default new TwoFactorController();
