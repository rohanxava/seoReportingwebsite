
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    }
});

export async function sendOtpEmail(to: string, otp: string) {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: 'Your SEO Clarity Verification Code',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Email Verification</h2>
                <p>Hello,</p>
                <p>Thank you for signing up with SEO Clarity. Please use the following One-Time Password (OTP) to complete your verification process.</p>
                <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0; color: #007bff;">${otp}</p>
                <p>This code will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>The SEO Clarity Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully to', to);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Could not send verification email.');
    }
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: 'Reset Your SEO Clarity Password',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Password Reset Request</h2>
                <p>Hello,</p>
                <p>You recently requested to reset your password for your SEO Clarity account. Click the button below to reset it.</p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
                <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
                <p>This link will expire in 1 hour.</p>
                <p>Best regards,<br>The SEO Clarity Team</p>
            </div>
        `,
        sendgrid: {
            asm: null,
            trackingSettings: {
                clickTracking: {
                    enable: false,
                    enableText: false
                },
                openTracking: {
                    enable: false
                }
            }
        }
    };

    try {
        await transporter.sendMail(mailOptions as any);
        console.log('Password reset email sent successfully to', to);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Could not send password reset email.');
    }
}
