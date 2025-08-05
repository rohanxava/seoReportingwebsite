
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
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8; padding:20px 0; font-family:Arial,sans-serif;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background:#007bff; padding:20px;">
              <h1 style="color:#ffffff; font-size:24px; margin:0;">SEO Clarity</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333; font-size:16px; line-height:1.6;">
              <h2 style="margin-top:0; color:#007bff; text-align:center;">Email Verification</h2>
              <p>Hello,</p>
              <p>
                Thank you for signing up with <strong>SEO Clarity</strong>. Please use the following 
                One-Time Password (OTP) to complete your verification process:
              </p>
              
              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0;">
                <tr>
                  <td align="center">
                    <div style="display:inline-block; padding:15px 30px; background:#f0f4ff; border:2px dashed #007bff; border-radius:8px; font-size:28px; font-weight:bold; color:#007bff; letter-spacing:4px;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>
              
              <p>This code will expire in <strong>10 minutes</strong>.</p>
              <p>If you did not request this, please ignore this email.</p>
              
              
              
              <p style="margin-top:30px;">Best regards,<br><strong>The SEO Clarity Team</strong></p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9f9f9; color:#999; font-size:12px; padding:15px;">
              <p style="margin:0;">© 2025 SEO Clarity. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
`

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
