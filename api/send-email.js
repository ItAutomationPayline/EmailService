import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { recipients, subject, body } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            ciphers: 'TLSv1.2',
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: recipients.join(','),
        subject: subject,
        html: body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
