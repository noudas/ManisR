import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// The email that will transport the email
// see here how to create it https://colab.research.google.com/drive/1IqKpyk1EKfRGeAQLzwRNpMny1M2GhC5z?usp=sharing
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendVerificationEmail(email,verificationToken) {
    const verificationLink = `${process.env.BASE_URL}/api/v1/users/verify-email?token=${verificationToken}`;

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
    
    try{
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
        
    } catch (error){
        console.error('Email sending error:', error);
        throw new Error('Failed to send verification email');
    }
}