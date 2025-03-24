/**
 * Email Service
 * Handles email verification using Nodemailer.
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify SMTP Connection
transporter.verify((error) => {
    if (error) {
        console.error("❌ [SMTP Error] Unable to connect to email server:", error);
    } else {
        console.log("✅ [SMTP] Email service is ready to send messages");
    }
});

/**
 * Sends a verification email to the user.
 * @param {string} email - User's email address.
 * @param {string} verificationToken - Token for email verification.
 */
export async function sendVerificationEmail(email, verificationToken) {
    const verificationLink = `${process.env.BASE_URL}/api/v1/auth/verify-email?token=${verificationToken}`;

    console.log(`📤 [Email Service] Sending verification email to ${email}`);
    console.log(`🔗 [Verification Link] ${verificationLink}`);

    const mailOptions = {
        from: `"Support Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email',
        html: `
            <h2>Email Verification</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ [Email Sent] Verification email sent to ${email}: ${info.response}`);
    } catch (error) {
        console.error(`❌ [Email Error] Failed to send verification email to ${email}:`, error);
        throw new Error("Failed to send verification email");
    }
}
