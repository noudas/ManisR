import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Create the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Verify SMTP Connection
transporter.verify(function (error, success) {
    if (error) {
        console.error("❌ SMTP Connection Error:", error);
    } else {
        console.log("✅ Server is ready to take messages");
    }
});

// ✅ Function to send email verification
export async function sendVerificationEmail(email, verificationToken) {
    console.log(`📤 Preparing to send verification email to: ${email}`);

    const verificationLink = `${process.env.BASE_URL}/api/v1/users/verify-email?token=${verificationToken}`;
    console.log(`🔗 Verification Link: ${verificationLink}`);

    const mailOptions = {
        from: process.env.EMAIL_USER,
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
        console.log("✅ Verification email sent:", info.response);
    } catch (error) {
        console.error("❌ Email Sending Error:", error);
        throw new Error("Failed to send verification email");
    }
}
