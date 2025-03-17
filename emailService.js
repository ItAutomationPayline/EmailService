const nodemailer = require('nodemailer');
require('dotenv').config();

export const sendEmail = async (recipients, subject, body) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false, // TLS requires `false` for port 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            ciphers: 'TLSv1.2', // Office 365 requires TLS 1.2
            rejectUnauthorized: false // Optional: Bypass self-signed certificate issues
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: recipients.join(','), // Join array as comma-separated string
        subject: subject,
        html: body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        return { success: true, message: `Email sent to ${recipients.length} recipients.` };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = { sendEmail };
