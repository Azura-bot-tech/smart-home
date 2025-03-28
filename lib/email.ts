import nodemailer from 'nodemailer';

// Tạo transporter để gửi email
export const transporter = nodemailer.createTransport({
  service: 'gmail', // Sử dụng Gmail
  host: 'smtp.gmail.com', // SMTP server của Gmail
  port: 587, // Port cho TLS
  secure: false, // true cho SSL, false cho TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD // App Password từ Google
  }
});

// Hàm gửi email xác thực
export async function sendVerificationEmail(to: string, code: string) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #333; font-size: 32px; letter-spacing: 5px;">${code}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendNewPasswordEmail(to: string, newPassword: string) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Your New Password',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your New Password</h2>
          <p>Here is your new password: <strong>${newPassword}</strong></p>
          <p>Please change this password after logging in for security purposes.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending new password email:', error);
    return false;
  }
}
